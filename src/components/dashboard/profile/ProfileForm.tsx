"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { ProfilePhotoCard } from "@/components/dashboard/profile/ProfilePhotoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReadOnlyField } from "@/components/ui/ReadOnlyField";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { updateProfile, type SavedProfile } from "@/lib/actions/profile";
import { uploadImage } from "@/lib/uploadImage";
import type { UserRole } from "@/lib/roles";

type FormValues = { name: string; phone: string; area: string; bio: string };
type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const toFormValues = (profile: SavedProfile): FormValues => ({
  name: profile.name || "",
  phone: profile.phone || "",
  area: profile.area || "",
  bio: profile.bio || "",
});

function validateField(field: FieldName, values: FormValues): string | undefined {
  const value = values[field];
  if (field === "name") {
    const name = value.trim();
    if (!name) return "Enter your full name.";
    if (name.length < 2 || name.length > 60) return "Name must be between 2 and 60 characters.";
  }
  if (field === "phone" && value.trim()) {
    const phone = value.replace(/[\s-]/g, "");
    if (!/^\+?\d{7,15}$/.test(phone)) return "Enter a valid phone number";
  }
  if (field === "area" && value.trim().length > 100) return "Area must be 100 characters or fewer.";
  if (field === "bio" && value.trim().length > 300) return "Bio must be 300 characters or fewer.";
  return undefined;
}

function validate(values: FormValues): FormErrors {
  return {
    name: validateField("name", values),
    phone: validateField("phone", values),
    area: validateField("area", values),
    bio: validateField("bio", values),
  };
}

export function ProfileForm({ profile, role }: { profile: SavedProfile; role: UserRole }) {
  const router = useRouter();
  const [savedProfile, setSavedProfile] = useState(profile);
  const [values, setValues] = useState<FormValues>(() => toFormValues(profile));
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [saving, setSaving] = useState(false);
  const previewUrlRef = useRef<string | null>(null);
  const { refetch: refreshSession } = authClient.useSession();

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  function choosePhoto(file: File | null, error?: string) {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = file ? URL.createObjectURL(file) : null;
    setPreviewUrl(previewUrlRef.current);
    setSelectedPhoto(file);
    setPhotoError(error || "");
  }

  const isDirty = useMemo(() => (
    selectedPhoto !== null
    || values.name !== savedProfile.name
    || values.phone !== savedProfile.phone
    || values.area !== savedProfile.area
    || values.bio !== savedProfile.bio
  ), [selectedPhoto, values, savedProfile]);

  function updateValue(field: FieldName, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, nextValues) }));
  }

  function validateOnBlur(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  }

  function resetForm() {
    setValues(toFormValues(savedProfile));
    choosePhoto(null);
    setErrors({});
    setTouched({});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setTouched({ name: true, phone: true, area: true, bio: true });
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean) || photoError) return;

    setSaving(true);
    try {
      let image: string | undefined;
      if (selectedPhoto) {
        try {
          image = await uploadImage(selectedPhoto, { profile: true });
        } catch {
          toast.add({ title: "Photo upload failed", description: "Photo upload failed. Try again.", type: "error" });
          return;
        }
      }

      const result = await updateProfile({
        name: values.name.trim(),
        phone: values.phone,
        area: values.area.trim(),
        bio: values.bio.trim(),
        ...(image ? { image } : {}),
      });

      if (!result.ok) {
        toast.add({ title: "Profile update failed", description: result.message, type: "error" });
        return;
      }

      setSavedProfile(result.profile);
      setValues(toFormValues(result.profile));
      choosePhoto(null);
      setErrors({});
      setTouched({});
      toast.add({ title: "Profile updated successfully", type: "success" });

      // Force a fresh server read so Better Auth and the server-rendered shell use the updated user document.
      try {
        await refreshSession({ query: { disableCookieCache: true } });
      } catch {
        // The profile was saved; the server-rendered shell is still refreshed below.
      }
      router.refresh();
    } catch {
      toast.add({ title: "Profile update failed", description: "Unable to update your profile. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  const bioPlaceholder = role === "customer"
    ? "Tell technicians a little about yourself"
    : role === "technician"
      ? "Describe your skills and experience"
      : "Add a short bio";
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.75fr)]">
      <ProfilePhotoCard
        name={values.name || savedProfile.name || "FixMate member"}
        role={role}
        image={savedProfile.image}
        previewUrl={previewUrl}
        error={photoError}
        onSelect={choosePhoto}
      />

      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader className="px-5 pb-2 pt-5 sm:px-6 sm:pt-6">
          <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
          <CardDescription className="text-xs">Update your personal details and contact address.</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={values.name}
                  onChange={(event) => updateValue("name", event.target.value)}
                  onBlur={() => validateOnBlur("name")}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? "profile-name-error" : undefined}
                  autoComplete="name"
                  maxLength={60}
                  className="h-11 rounded-xl bg-background px-3"
                />
                {touched.name && errors.name && <FieldError id="profile-name-error" message={errors.name} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone Number (optional)</Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                  onBlur={() => validateOnBlur("phone")}
                  aria-invalid={Boolean(touched.phone && errors.phone)}
                  aria-describedby={touched.phone && errors.phone ? "profile-phone-error" : undefined}
                  autoComplete="tel"
                  placeholder="e.g. 01XXXXXXXXX"
                  className={`h-11 rounded-xl px-3 ${touched.phone && errors.phone ? "border-red-300 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20" : "bg-background"}`}
                />
                {touched.phone && errors.phone && <FieldError id="profile-phone-error" message={errors.phone} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-area">Area</Label>
                <Input
                  id="profile-area"
                  value={values.area}
                  onChange={(event) => updateValue("area", event.target.value)}
                  onBlur={() => validateOnBlur("area")}
                  aria-invalid={Boolean(touched.area && errors.area)}
                  aria-describedby={touched.area && errors.area ? "profile-area-error" : undefined}
                  placeholder="e.g. Mirpur, Dhaka"
                  maxLength={100}
                  className="h-11 rounded-xl bg-background px-3"
                />
                {touched.area && errors.area && <FieldError id="profile-area-error" message={errors.area} />}
              </div>

              <ReadOnlyField id="profile-email" label="Email Address" value={savedProfile.email} helper="Email cannot be changed" />
              <ReadOnlyField id="profile-role" label="Role" value={roleLabel} helper="Role is managed by FixMate" />

              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="profile-bio">Bio</Label>
                  <span className="text-xs tabular-nums text-muted-foreground">{values.bio.length} / 300</span>
                </div>
                <Textarea
                  id="profile-bio"
                  value={values.bio}
                  onChange={(event) => updateValue("bio", event.target.value)}
                  onBlur={() => validateOnBlur("bio")}
                  aria-invalid={Boolean(touched.bio && errors.bio)}
                  aria-describedby={touched.bio && errors.bio ? "profile-bio-error" : undefined}
                  placeholder={bioPlaceholder}
                  maxLength={300}
                  className="min-h-24 resize-y rounded-xl bg-background px-3 py-3"
                />
                {touched.bio && errors.bio && <FieldError id="profile-bio-error" message={errors.bio} />}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={resetForm} disabled={saving} className="min-h-11 rounded-xl px-5">Cancel</Button>
              <Button type="submit" disabled={!isDirty || saving} className="min-h-11 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8] disabled:opacity-50">
                {saving ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Saving...</> : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return <p id={id} className="flex items-center gap-1.5 text-xs text-destructive" role="alert"><AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />{message}</p>;
}

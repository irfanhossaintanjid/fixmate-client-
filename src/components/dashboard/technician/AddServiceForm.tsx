"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle, MapPin, PackageCheck, X } from "lucide-react";
import { ServiceImageUpload } from "@/components/dashboard/technician/ServiceImageUpload";
import { ServiceModeSelector } from "@/components/dashboard/technician/ServiceModeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createTechnicianService } from "@/lib/actions/services";
import { uploadImage } from "@/lib/uploadImage";
import { serviceCategories, type ServiceCategory, type ServiceMode } from "@/types/service";
import { validateServiceField, validateServiceForm, type ServiceFormErrors, type ServiceFormField, type ServiceFormValues } from "@/lib/validation/service";

type Values = ServiceFormValues;
type Field = ServiceFormField;
type Errors = ServiceFormErrors;
const initialValues: Values = { title: "", category: "", description: "", basePrice: "", estimatedDuration: "", serviceMode: "", serviceArea: "" };

export function AddServiceForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<"upload" | "save" | null>(null);
  const previewRef = useRef<string | null>(null);
  const submissionLock = useRef(false);

  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); }, []);

  function setImageFile(file: File | null, error = "") {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = file ? URL.createObjectURL(file) : null;
    setPreview(previewRef.current);
    setImage(file);
    setImageError(error);
    setErrors((current) => ({ ...current, image: file || error ? undefined : "Upload a service image." }));
  }

  function changeValue<K extends keyof Values>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateServiceField(field, next, Boolean(image)) }));
  }

  function blurField(field: keyof Values) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateServiceField(field, values, Boolean(image)) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    const nextErrors = validateServiceForm(values, Boolean(image));
    setTouched({ title: true, category: true, description: true, basePrice: true, estimatedDuration: true, serviceMode: true, serviceArea: true, image: true });
    setErrors(nextErrors);
    if (imageError || Object.values(nextErrors).some(Boolean)) return;

    submissionLock.current = true;
    setSubmitting(true);
    try {
      setProgress("upload");
      let imageUrl: string;
      try {
        imageUrl = await uploadImage(image as File, { service: true });
      } catch (error) {
        toast.add({ title: "Image upload failed", description: error instanceof Error ? error.message : "Please try again.", type: "error" });
        return;
      }

      setProgress("save");
      const result = await createTechnicianService({
        title: values.title.trim(),
        category: values.category as ServiceCategory,
        description: values.description.trim(),
        basePrice: Number(values.basePrice),
        estimatedDuration: values.estimatedDuration.trim(),
        serviceMode: values.serviceMode as ServiceMode,
        serviceArea: values.serviceArea.trim(),
        image: imageUrl,
      });

      if (!result.ok) {
        toast.add({ title: "Service submission failed", description: result.message, type: "error" });
        return;
      }

      toast.add({ title: "Service submitted successfully!", description: "It is waiting for admin approval.", type: "success" });
      router.push("/dashboard/technician/my-services");
      router.refresh();
    } catch {
      toast.add({ title: "Service submission failed", description: "Unable to submit this service. Please try again.", type: "error" });
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
      setProgress(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Card className="rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/70 px-5 py-4 sm:px-6"><CardTitle className="text-base font-semibold">Basic Service Information</CardTitle><CardDescription className="text-xs">Describe the repair service customers can request.</CardDescription></CardHeader>
          <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <FieldWrap id="service-title" label="Service Title" required error={touched.title ? errors.title : undefined}>
              <Input id="service-title" value={values.title} onChange={(e) => changeValue("title", e.target.value)} onBlur={() => blurField("title")} placeholder="e.g. Smartphone Screen Replacement" maxLength={100} aria-invalid={Boolean(touched.title && errors.title)} aria-describedby={touched.title && errors.title ? "service-title-error" : undefined} className="min-h-11 rounded-xl bg-background" />
            </FieldWrap>
            <FieldWrap id="service-category" label="Service Category" required error={touched.category ? errors.category : undefined}>
              <select id="service-category" value={values.category} onChange={(e) => changeValue("category", e.target.value as ServiceCategory | "")} onBlur={() => blurField("category")} aria-invalid={Boolean(touched.category && errors.category)} aria-describedby={touched.category && errors.category ? "service-category-error" : undefined} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive">
                <option value="">Select a category</option>{serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </FieldWrap>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between gap-3"><Label htmlFor="service-description">Service Description <span className="text-destructive" aria-hidden="true">*</span></Label><span className="text-xs tabular-nums text-muted-foreground">{values.description.length} / 2000</span></div>
              <Textarea id="service-description" value={values.description} onChange={(e) => changeValue("description", e.target.value)} onBlur={() => blurField("description")} placeholder="Describe the repair service, what is included, and the problems you can solve." maxLength={2000} aria-invalid={Boolean(touched.description && errors.description)} aria-describedby={touched.description && errors.description ? "service-description-error" : undefined} className="min-h-32 resize-y rounded-xl bg-background" />
              {touched.description && errors.description && <FieldError id="service-description-error" message={errors.description} />}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/70 px-5 py-4 sm:px-6"><CardTitle className="text-base font-semibold">Pricing &amp; Duration</CardTitle><CardDescription className="text-xs">Set the starting price and expected time for the repair.</CardDescription></CardHeader>
          <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <FieldWrap id="service-price" label="Base Price (USD)" required error={touched.basePrice ? errors.basePrice : undefined}>
              <div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span><Input id="service-price" type="number" min="0.01" step="0.01" inputMode="decimal" value={values.basePrice} onChange={(e) => changeValue("basePrice", e.target.value)} onBlur={() => blurField("basePrice")} placeholder="Enter your starting price" aria-invalid={Boolean(touched.basePrice && errors.basePrice)} aria-describedby={touched.basePrice && errors.basePrice ? "service-price-error" : undefined} className="min-h-11 rounded-xl bg-background pl-8" /></div>
            </FieldWrap>
            <FieldWrap id="service-duration" label="Estimated Duration" required error={touched.estimatedDuration ? errors.estimatedDuration : undefined}>
              <Input id="service-duration" value={values.estimatedDuration} onChange={(e) => changeValue("estimatedDuration", e.target.value)} onBlur={() => blurField("estimatedDuration")} placeholder="e.g. 1–2 hours or 1 day" maxLength={80} aria-invalid={Boolean(touched.estimatedDuration && errors.estimatedDuration)} aria-describedby={touched.estimatedDuration && errors.estimatedDuration ? "service-duration-error" : undefined} className="min-h-11 rounded-xl bg-background" />
            </FieldWrap>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/70 px-5 py-4 sm:px-6"><CardTitle className="text-base font-semibold">Service Availability</CardTitle><CardDescription className="text-xs">Choose how and where you provide this service.</CardDescription></CardHeader>
          <CardContent className="space-y-5 p-5 sm:p-6">
            <ServiceModeSelector value={values.serviceMode} onChange={(value) => changeValue("serviceMode", value)} error={touched.serviceMode ? errors.serviceMode : undefined} />
            <FieldWrap id="service-area" label="Service Area" required error={touched.serviceArea ? errors.serviceArea : undefined}>
              <div className="relative"><MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input id="service-area" value={values.serviceArea} onChange={(e) => changeValue("serviceArea", e.target.value)} onBlur={() => blurField("serviceArea")} placeholder="e.g. Feni, Bangladesh" maxLength={100} aria-invalid={Boolean(touched.serviceArea && errors.serviceArea)} aria-describedby={touched.serviceArea && errors.serviceArea ? "service-area-error" : undefined} className="min-h-11 rounded-xl bg-background pl-9" /></div>
            </FieldWrap>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/70 px-5 py-4 sm:px-6"><CardTitle className="text-base font-semibold">Service Image</CardTitle><CardDescription className="text-xs">Upload an image that represents this repair service.</CardDescription></CardHeader>
          <CardContent className="p-5 sm:p-6"><ServiceImageUpload file={image} preview={preview} error={(touched.image && errors.image) || imageError} onChange={setImageFile} /></CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/technician/my-services")} disabled={submitting} className="min-h-11 rounded-xl px-5"><X className="size-4" aria-hidden="true" /> Cancel</Button>
          <Button type="submit" disabled={submitting} className="min-h-11 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8] disabled:opacity-60">
            {submitting ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> {progress === "upload" ? "Uploading image..." : "Publishing service..."}</> : <><PackageCheck className="size-4" aria-hidden="true" /> Publish Service</>}
          </Button>
        </div>
    </form>
  );
}

function FieldWrap({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  const errorId = `${id}-error`;
  return <div className="space-y-2"><Label htmlFor={id}>{label} {required && <span className="text-destructive" aria-hidden="true">*</span>}</Label>{children}{error && <FieldError id={errorId} message={error} />}</div>;
}

function FieldError({ id, message }: { id: string; message: string }) {
  return <p id={id} className="flex items-center gap-1.5 text-xs text-destructive" role="alert"><AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />{message}</p>;
}

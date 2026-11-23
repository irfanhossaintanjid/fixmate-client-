"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle, Pencil, X } from "lucide-react";
import { ServiceImageUpload } from "@/components/dashboard/technician/ServiceImageUpload";
import { ServiceModeSelector } from "@/components/dashboard/technician/ServiceModeSelector";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { updateTechnicianService } from "@/lib/actions/services";
import { validateServiceField, validateServiceForm, type ServiceFormErrors, type ServiceFormField, type ServiceFormValues } from "@/lib/validation/service";
import { uploadImage } from "@/lib/uploadImage";
import { serviceCategories, type ServiceCategory, type ServiceMode, type TechnicianService } from "@/types/service";

function serviceValues(service: TechnicianService): ServiceFormValues {
  return {
    title: service.title || "",
    category: service.category || "",
    description: service.description || "",
    basePrice: String(service.basePrice ?? ""),
    estimatedDuration: service.estimatedDuration || "",
    serviceMode: service.serviceMode || "",
    serviceArea: service.serviceArea || "",
  };
}

export function EditServiceDialog({ service }: { service: TechnicianService }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(() => serviceValues(service));
  const [touched, setTouched] = useState<Partial<Record<ServiceFormField, boolean>>>({});
  const [errors, setErrors] = useState<ServiceFormErrors>({});
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const previewRef = useRef<string | null>(null);
  const lock = useRef(false);

  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); }, []);
  function prepareOpen(next: boolean) {
    if (next) {
    setValues(serviceValues(service));
    setTouched({});
    setErrors({});
    setImage(null);
    setImageError("");
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setPreview(null);
    }
    setOpen(next);
  }

  function selectImage(file: File | null, error = "") {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = file ? URL.createObjectURL(file) : null;
    setPreview(previewRef.current);
    setImage(file);
    setImageError(error);
  }

  function changeValue<K extends keyof ServiceFormValues>(field: K, value: ServiceFormValues[K]) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateServiceField(field, nextValues, Boolean(image || service.image)) }));
  }

  function blurField(field: keyof ServiceFormValues) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateServiceField(field, values, Boolean(image || service.image)) }));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const nextErrors = validateServiceForm(values, Boolean(image || service.image));
    setTouched({ title: true, category: true, description: true, basePrice: true, estimatedDuration: true, serviceMode: true, serviceArea: true, image: true });
    setErrors(nextErrors);
    if (imageError || Object.values(nextErrors).some(Boolean)) return;

    lock.current = true;
    setBusy(true);
    try {
      let imageUrl: string | undefined;
      if (image) {
        setUploading(true);
        try {
          imageUrl = await uploadImage(image, { service: true });
        } catch (error) {
          toast.add({ title: "Image upload failed", description: error instanceof Error ? error.message : "Please try again.", type: "error" });
          return;
        } finally {
          setUploading(false);
        }
      }

      const result = await updateTechnicianService(service.id, {
        title: values.title.trim(),
        category: values.category as ServiceCategory,
        description: values.description.trim(),
        basePrice: Number(values.basePrice),
        estimatedDuration: values.estimatedDuration.trim(),
        serviceMode: values.serviceMode as ServiceMode,
        serviceArea: values.serviceArea.trim(),
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      if (!result.ok) {
        toast.add({ title: "Service update failed", description: result.message, type: "error" });
        return;
      }
      toast.add({ title: "Service updated successfully!", description: "Your changes are waiting for admin approval.", type: "success" });
      setOpen(false);
      router.refresh();
    } catch {
      toast.add({ title: "Service update failed", description: "Unable to save your changes. Please try again.", type: "error" });
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  return <Dialog open={open} onOpenChange={(next) => { if (!busy) prepareOpen(next); }}>
    <Button type="button" variant="ghost" size="icon" onClick={() => prepareOpen(true)} aria-label={`Edit ${service.title}`} title="Edit service" className="size-10 rounded-lg text-primary hover:bg-primary/10"><Pencil className="size-4" aria-hidden="true" /></Button>
    <DialogContent showCloseButton={!busy} className="max-h-[92svh] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-0 shadow-2xl">
      <DialogHeader className="sticky top-0 z-10 border-b border-border bg-card px-5 py-4 text-left sm:px-6"><DialogTitle className="text-lg font-semibold">Edit Service</DialogTitle><DialogDescription>Update your listing. Any saved changes will need admin approval again.</DialogDescription></DialogHeader>
      <form onSubmit={save} noValidate className="space-y-5 px-5 py-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="edit-title" label="Service Title" error={touched.title ? errors.title : undefined}><Input id="edit-title" value={values.title} onChange={(e) => changeValue("title", e.target.value)} onBlur={() => blurField("title")} maxLength={100} aria-invalid={Boolean(touched.title && errors.title)} className="min-h-11 rounded-xl bg-background" /></Field>
          <Field id="edit-category" label="Service Category" error={touched.category ? errors.category : undefined}><select id="edit-category" value={values.category} onChange={(e) => changeValue("category", e.target.value as ServiceCategory | "")} onBlur={() => blurField("category")} aria-invalid={Boolean(touched.category && errors.category)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">{serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></Field>
        </div>
        <Field id="edit-description" label="Service Description" error={touched.description ? errors.description : undefined}><Textarea id="edit-description" value={values.description} onChange={(e) => changeValue("description", e.target.value)} onBlur={() => blurField("description")} maxLength={2000} aria-invalid={Boolean(touched.description && errors.description)} className="min-h-28 rounded-xl bg-background" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="edit-price" label="Base Price (USD)" error={touched.basePrice ? errors.basePrice : undefined}><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span><Input id="edit-price" type="number" min="0.01" step="0.01" inputMode="decimal" value={values.basePrice} onChange={(e) => changeValue("basePrice", e.target.value)} onBlur={() => blurField("basePrice")} aria-invalid={Boolean(touched.basePrice && errors.basePrice)} className="min-h-11 rounded-xl bg-background pl-8" /></div></Field>
          <Field id="edit-duration" label="Estimated Duration" error={touched.estimatedDuration ? errors.estimatedDuration : undefined}><Input id="edit-duration" value={values.estimatedDuration} onChange={(e) => changeValue("estimatedDuration", e.target.value)} onBlur={() => blurField("estimatedDuration")} maxLength={80} aria-invalid={Boolean(touched.estimatedDuration && errors.estimatedDuration)} className="min-h-11 rounded-xl bg-background" /></Field>
        </div>
        <ServiceModeSelector value={values.serviceMode} onChange={(value) => changeValue("serviceMode", value)} error={touched.serviceMode ? errors.serviceMode : undefined} />
        <Field id="edit-area" label="Service Area" error={touched.serviceArea ? errors.serviceArea : undefined}><Input id="edit-area" value={values.serviceArea} onChange={(e) => changeValue("serviceArea", e.target.value)} onBlur={() => blurField("serviceArea")} maxLength={100} aria-invalid={Boolean(touched.serviceArea && errors.serviceArea)} className="min-h-11 rounded-xl bg-background" /></Field>
        <ServiceImageUpload file={image} preview={preview} existingImage={service.image} error={(touched.image && errors.image) || imageError} onChange={selectImage} />
        <DialogFooter className="sticky bottom-0 -mx-5 -mb-4 border-t border-border bg-card px-5 py-4 sm:-mx-6 sm:px-6">
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={busy} className="min-h-11 rounded-xl"><X className="size-4" aria-hidden="true" /> Cancel</Button>
          <Button type="submit" disabled={busy} className="min-h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#4338A8]">{busy ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> {uploading ? "Uploading image..." : "Saving changes..."}</> : "Save Changes"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label} <span className="text-destructive" aria-hidden="true">*</span></Label>{children}{error && <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert"><AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />{error}</p>}</div>;
}

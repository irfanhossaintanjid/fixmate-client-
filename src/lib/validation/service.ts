import type { ServiceCategory, ServiceMode } from "@/types/service";

export type ServiceFormValues = {
  title: string;
  category: ServiceCategory | "";
  description: string;
  basePrice: string;
  estimatedDuration: string;
  serviceMode: ServiceMode | "";
  serviceArea: string;
};

export type ServiceFormField = keyof ServiceFormValues | "image";
export type ServiceFormErrors = Partial<Record<ServiceFormField, string>>;

export function validateServiceField(field: ServiceFormField, values: ServiceFormValues, hasImage: boolean): string | undefined {
  if (field === "title") {
    const title = values.title.trim();
    if (!title) return "Enter a service title.";
    if (title.length < 3 || title.length > 100) return "Title must be between 3 and 100 characters.";
  }
  if (field === "category" && !values.category) return "Choose a service category.";
  if (field === "description") {
    const description = values.description.trim();
    if (!description) return "Enter a service description.";
    if (description.length > 2000) return "Description must be 2000 characters or fewer.";
  }
  if (field === "basePrice") {
    const price = Number(values.basePrice);
    if (!values.basePrice.trim() || !Number.isFinite(price) || price <= 0) return "Enter a price greater than zero.";
  }
  if (field === "estimatedDuration") {
    const duration = values.estimatedDuration.trim();
    if (!duration) return "Enter the estimated duration.";
    if (duration.length > 80) return "Duration must be 80 characters or fewer.";
  }
  if (field === "serviceMode" && !values.serviceMode) return "Choose a service mode.";
  if (field === "serviceArea") {
    const area = values.serviceArea.trim();
    if (!area) return "Enter the service area.";
    if (area.length < 2 || area.length > 100) return "Area must be between 2 and 100 characters.";
  }
  if (field === "image" && !hasImage) return "Upload a service image.";
  return undefined;
}

export function validateServiceForm(values: ServiceFormValues, hasImage: boolean): ServiceFormErrors {
  return {
    title: validateServiceField("title", values, hasImage),
    category: validateServiceField("category", values, hasImage),
    description: validateServiceField("description", values, hasImage),
    basePrice: validateServiceField("basePrice", values, hasImage),
    estimatedDuration: validateServiceField("estimatedDuration", values, hasImage),
    serviceMode: validateServiceField("serviceMode", values, hasImage),
    serviceArea: validateServiceField("serviceArea", values, hasImage),
    image: validateServiceField("image", values, hasImage),
  };
}

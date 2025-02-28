import { BrandFormData } from "@/app/types/brand";
import { Input, Textarea } from "@heroui/react";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<BrandFormData>;
  error?: string;
  type?: "input" | "textarea";
  rows?: number;
}

export function FormField({
  label,
  name,
  placeholder,
  register,
  error,
  type = "input",
  rows = 4,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-gray-2">{label}</label>
      {type === "input" ? (
        <Input
          {...register(name as keyof BrandFormData)}
          placeholder={placeholder}
          isInvalid={!!error}
          errorMessage={error}
          variant="bordered"
        />
      ) : (
        <Textarea
          {...register(name as keyof BrandFormData)}
          placeholder={placeholder}
          rows={rows}
          isInvalid={!!error}
          errorMessage={error}
          variant="bordered"
        />
      )}
    </div>
  );
}
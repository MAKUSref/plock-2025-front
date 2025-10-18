import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import type { ZodSchema } from "zod";

export function useSchemaForm<T extends FieldValues>(
  schema: ZodSchema<T>,
  options?: {
    defaultValues?: DefaultValues<T>;
  },
) {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: options?.defaultValues,
  });
}
import { zodResolver } from '@hookform/resolvers/zod';
import { type PropsWithChildren } from 'react';
import {
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type UseFormReturn,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { z, type ZodSchema } from 'zod';

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (data: z.infer<ZodSchema<T>>, form: UseFormReturn<T>) => void;
  onError?: (errors: FieldErrors<T>, form: UseFormReturn<T>) => void;
  className?: string;
  withAutoComplete?: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
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

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  onError,
  className,
  children,
  withAutoComplete,
}: PropsWithChildren<FormProps<T>>) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        autoComplete={withAutoComplete ? undefined : 'off'}
        className={className}
        onSubmit={form.handleSubmit(
          (data) => onSubmit(data as T, form),
          onError
            ? (errors) => onError(errors as FieldErrors<T>, form)
            : undefined,
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
}

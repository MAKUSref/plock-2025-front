import { type PropsWithChildren } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type UseFormReturn,
  FormProvider,
} from 'react-hook-form';
import { z, type ZodSchema } from 'zod';

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (data: z.infer<ZodSchema<T>>, form: UseFormReturn<T>) => void;
  onError?: (errors: FieldErrors<T>, form: UseFormReturn<T>) => void;
  className?: string;
  withAutoComplete?: boolean;
};

export function SchemaForm<T extends FieldValues>({
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

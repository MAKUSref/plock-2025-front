import { type InputProps, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export function TextInput({ name, ...props }: InputProps & { name: string }) {
  const form = useFormContext();

  return (
    <Controller
      name={name}
      control={form.control}
      {...props}
      render={({ field }) => <Input {...field} />}
    />
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col p-4 border border-gray-300 rounded-md ">
        <Form.Item>
          <p>Email</p>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input {...field} placeholder="Wpisz email" />
            )}
          />
        </Form.Item>
        <Form.Item>
          <p>Password</p>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input {...field} placeholder="Hasło" type="password" />
            )}
          />
        </Form.Item>
        <div className="flex justify-end">
          <Button htmlType="submit">Login</Button>
        </div>
      </div>
    </form>
  );
}

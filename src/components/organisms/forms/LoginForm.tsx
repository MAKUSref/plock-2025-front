import { Button, Form } from "antd";
import z from "zod";
import { useSchemaForm } from "../../../hooks/useSchemaForm";
import { SchemaForm } from "../../molecules/SchemaForm";
import { TextInput } from "../../molecules/TextInput";

const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useSchemaForm(loginFormSchema);

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data);
  };

  return (
    <SchemaForm form={form} onSubmit={onSubmit}>
      <div className="flex flex-col p-4 border border-gray-300 rounded-md ">
        <Form.Item>
          <p>Email</p>
          <TextInput name="email" placeholder="Wpisz email" />
        </Form.Item>
        <Form.Item>
          <p>Password</p>
          <TextInput name="password" placeholder="Wpisz hasło" type="password" />
        </Form.Item>
        <div className="flex justify-end">
          <Button htmlType="submit">Login</Button>
        </div>
      </div>
    </SchemaForm>
  );
}

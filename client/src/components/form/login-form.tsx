import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormTextField from "@/components/form-text-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: z
        .string()
        .min(4, {
            message: "Username must be at least 4 characters.",
        })
        .max(12, {
            message: "Username can be at most 12 characters.",
        }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .max(30, {
            message: "Password can be at most 30 characters.",
        }),
});

export type LoginFormInput = z.infer<typeof formSchema>;

interface LoginFormProps {
    onSubmit: (values: LoginFormInput) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const form = useForm<LoginFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormTextField
                    form={form}
                    name="username"
                    label="Username"
                    description="This is your username."
                />
                <FormTextField
                    form={form}
                    name="password"
                    label="Password"
                    description="This is your password."
                    inputType="password"
                />
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Form>
    );
}

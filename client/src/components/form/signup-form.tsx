import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormTextField from "@/components/form-text-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email.",
    }),
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

export type SignupFormInput = z.infer<typeof formSchema>;

interface SignupFormProps {
    onSubmit: (values: SignupFormInput) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
    const form = useForm<SignupFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormTextField
                    form={form}
                    name="email"
                    label="Email"
                    description="This is your email."
                    inputType="email"
                />
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
                        Sign up
                    </Button>
                </div>
            </form>
        </Form>
    );
}

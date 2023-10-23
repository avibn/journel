"use client";

import LoginForm, { LoginFormInput } from "@/components/form/login-form";

import { HyperLink } from "@/components/hyperlink";
import Link from "next/link";
import { clientAuth } from "@/network/client";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import useErrorToast from "@/hooks/use-error-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const { toastError } = useErrorToast();
    const { setUser, user } = useAuth();

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            router.push("/");
            router.refresh();
        }
    }, [user, router]);

    async function onSubmit(credentials: LoginFormInput) {
        try {
            const loggedInuser = await clientAuth.loginUser(credentials);

            setUser(loggedInuser);
            router.push("/");
            router.refresh();
        } catch (error) {
            toastError(error as Error);
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col  justify-center items-center mx-20 gap-10">
            <h1>Login</h1>
            <div className="w-1/3">
                <LoginForm onSubmit={onSubmit} />
            </div>
            <p className="text-sm text-gray-500">
                Don&rsquo;t have an account?{"  "}
                <HyperLink href="/signup" text="Sign Up" />
            </p>
        </div>
    );
}

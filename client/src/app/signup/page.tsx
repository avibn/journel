"use client";

import SignupForm, { SignupFormInput } from "@/components/form/signup-form";

import { ConflictError } from "../errors/http-errors";
import { HyperLink } from "@/components/hyperlink";
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

    async function onSubmit(credentials: SignupFormInput) {
        try {
            const loggedInuser = await clientAuth.signupUser(credentials);

            setUser(loggedInuser);
            router.push("/");
            router.refresh();
        } catch (error) {
            if (error instanceof ConflictError) {
                toastError(error as Error);
            }
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col  justify-center items-center mx-20 gap-10">
            <h1>Sign up</h1>
            <div className="w-1/3">
                <SignupForm onSubmit={onSubmit} />
            </div>
            <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <HyperLink href="/login" text="Login" />
            </p>
        </div>
    );
}

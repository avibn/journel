"use client";

import * as AuthApi from "@/network/client/auth";

import { LogIn, LogOut, User2 } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import useErrorToast from "@/hooks/use-error-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavBar() {
    const { user } = useAuth();
    const router = useRouter();
    const { setUser } = useAuth();
    const { toastError } = useErrorToast();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function onLogout() {
        setIsLoggingOut(true);
        try {
            await AuthApi.logoutUser();

            // Update the user state for client components
            setUser(null);

            // Refresh server side components
            router.push("/");
            router.refresh();
        } catch (error) {
            toastError(error as Error);
            console.error(error);
        }
        setIsLoggingOut(false);
    }

    return (
        <div className="border-b mb-5">
            <div className="flex h-16 items-center justify-between px-10">
                <h2 className="text-lg font-semibold">
                    <Link href="/">Journel</Link>
                </h2>

                {user ? (
                    <div className="flex justify-between items-center gap-10">
                        <div className="flex items-center gap-1">
                            <p>Hi, {user.username}</p>
                            <User2 size={15} />
                        </div>
                        <Button onClick={onLogout} disabled={isLoggingOut}>
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2" size={20} />
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

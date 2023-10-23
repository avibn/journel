import "../styles/globals.css";

import { AuthProvider } from "@/providers/auth-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NavBar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { serverAuth } from "@/network/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Journel",
    description: "A journal app called Journel for journaling.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get the logged in user
    let user;
    try {
        user = await serverAuth.fetchLoggedinUser();
    } catch (error) {
        user = null;
        console.log(error);
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider loggedInUser={user}>
                    <NavBar />
                    {children}
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}

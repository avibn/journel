"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
    const router = useRouter();
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center">
                <h3>Something went wrong!</h3>
                <p className="text-red-500">{error.message}</p>
            </div>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}

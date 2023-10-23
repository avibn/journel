import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl text-red-500">404</h1>
            <p>Could not find requested page.</p>
            <Button asChild className="mt-10">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}

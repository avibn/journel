import Link from "next/link";
import React from "react";

interface HyperLinkProps {
    href: string;
    text: string;
}

export const HyperLink = ({ href, text }: HyperLinkProps) => {
    return (
        <Link href={href} className="underline hover:text-indigo-400">
            {text}
        </Link>
    );
};

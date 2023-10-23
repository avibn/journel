import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { Journal } from "@/models/journal";
import Link from "next/link";
import { formatDate } from "@/utils/format-date";

interface JournalCardProps {
    journal: Journal;
}

export const JournalCard = ({ journal }: JournalCardProps) => {
    return (
        <Link href={`/journals/${journal._id}`} key={journal._id}>
            <Card className="m-1 cursor-pointer border-l-4 border-indigo-100 hover:border-indigo-300 duration-300">
                <CardHeader>
                    <CardTitle className="font-medium text-xl">
                        {journal.title}
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <p className="text-sm text-gray-500">
                        {formatDate(journal.createdAt)}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
};

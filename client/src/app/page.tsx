import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { HyperLink } from "@/components/hyperlink";
import { JournalActiveYearsResponse } from "@/network/server/journal";
import { JournalCard } from "@/components/journal-card";
import Link from "next/link";
import { NotebooksList } from "@/components/notebooks-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UnauthorizedError } from "./errors/http-errors";
import dateFormat from "dateformat";
import { serverJournal } from "@/network/server";

export const revalidate = 0;

export default async function Home() {
    // Fetch all journals by user
    let journals;
    try {
        journals = await serverJournal.fetchLimitJournalEntries(3);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            // Basic homepage with info about the app
            return (
                <div className="flex flex-col m-10 gap-4 items-center">
                    <p className="text-2xl font-bold">You are not logged in.</p>
                    <p className="text-gray-500">
                        Please <HyperLink href="/login" text="login" /> to view
                        your journals.
                    </p>
                </div>
            );
        }
        throw error;
    }

    // Fetch active years
    let activeYears: JournalActiveYearsResponse;
    try {
        activeYears = await serverJournal.fetchJournallingActiveYears();
    } catch (error) {
        activeYears = [];
    }

    return (
        <>
            <div className="m-10 flex flex-col gap-5">
                <h3 className="text-2xl font-bold">Notebooks</h3>
                <ScrollArea className="whitespace-nowrap rounded-md border">
                    <div className="flex w-max space-x-4 p-4">
                        <Suspense
                            fallback={[...Array(10)].map((_, i) => (
                                <Skeleton className="w-48 h-48 m-2" key={i} />
                            ))}
                        >
                            <NotebooksList />
                        </Suspense>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="flex flex-row justify-between">
                    <h3 className="text-2xl font-bold">Latest Entries</h3>
                    <Link
                        href="/journals"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        View All
                    </Link>
                </div>

                <div className="flex flex-col">
                    {journals.length === 0 && (
                        <div className="text-center">
                            <p className="text-2xl font-bold">No Journals</p>
                            <p className="text-gray-500">
                                You have no journals. Click the button above to
                                add one.
                            </p>
                        </div>
                    )}
                    {journals.map((journal) => (
                        <JournalCard key={journal._id} journal={journal} />
                    ))}
                </div>
            </div>

            {/* Add journal button */}
            <Button
                asChild
                className="fixed right-[2rem] bottom-[2rem] w-[3.5rem] h-[3.5rem] rounded-full font-light text-[2.5em] text-center leading-[3.5rem]"
            >
                <Link href="/new">+</Link>
            </Button>
        </>
    );
}

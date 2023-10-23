import { JournalCard } from "@/components/journal-card";
import { notFound } from "next/navigation";
import { serverJournal } from "@/network/server";

export const revalidate = 0;

export default async function Page() {
    let journals;
    try {
        journals = await serverJournal.fetchAllJournalEntries();
    } catch (error) {
        notFound();
    }

    return (
        <div className="m-10 flex flex-col gap-5">
            <h3 className="text-2xl font-bold">All Journals</h3>
            <div className="flex flex-col">
                {journals.length === 0 && (
                    <div className="text-center">
                        <p className="text-2xl font-bold">No Journals</p>
                        <p className="text-gray-500">You have no journals.</p>
                    </div>
                )}
                {journals.map((journal) => (
                    <JournalCard key={journal._id} journal={journal} />
                ))}
            </div>
        </div>
    );
}

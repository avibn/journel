import JournalDataView from "./journal-data-view";
import { notFound } from "next/navigation";
import { serverJournal } from "@/network/server";

export const revalidate = 0;

interface PageProps {
    params: { journalId: string };
}

export default async function Page({ params: { journalId } }: PageProps) {
    let journal;
    try {
        journal = await serverJournal.fetchJournalEntry(journalId);
    } catch (error) {
        notFound();
    }

    return <JournalDataView journal={journal} />;
}

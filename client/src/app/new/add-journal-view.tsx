"use client";

import AddJournalForm, {
    JournalFormInput,
} from "@/components/form/add-journal-form";

import { clientJournal } from "@/network/client";
import { createJournalEntry } from "@/network/client/journal";
import useErrorToast from "@/hooks/use-error-toast";
import { useRouter } from "next/navigation";

export default function AddJournalView() {
    const router = useRouter();
    const { toastError } = useErrorToast();

    async function onSubmit(values: JournalFormInput) {
        try {
            const addedJournal = await clientJournal.createJournalEntry(values);

            console.log(addedJournal);

            router.push("/");
            router.refresh();
        } catch (error) {
            toastError(error as Error);
        }
    }

    return (
        <div className="flex flex-col  justify-center items-center mx-20 gap-10">
            <h1 className="text-2xl">Add Journal</h1>
            <div className="w-1/2">
                <AddJournalForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}

"use client";

import AddJournalForm, {
    JournalFormInput,
} from "@/components/form/add-journal-form";
import {
    deleteJournalEntry,
    updateJournalEntry,
} from "@/network/client/journal";

import { Button } from "@/components/ui/button";
import DeleteAlertButton from "../../../components/delete-alert-button";
import { Journal } from "@/models/journal";
import RichEditor from "@/components/rich-editor";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date";
import useErrorToast from "@/hooks/use-error-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface JournalDataProps {
    journal: Journal;
}

export default function JournalDataView({ journal }: JournalDataProps) {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [hasBeenEdited, setHasBeenEdited] = useState(
        journal.createdAt !== journal.updatedAt
    );
    const { toastError } = useErrorToast();

    async function onEditJournal(values: JournalFormInput) {
        try {
            const editedJournal = await updateJournalEntry(journal._id, values);

            setIsEditMode(false);
            setHasBeenEdited(true);

            router.refresh();
        } catch (error) {
            toastError(error as Error);
        }
    }

    async function onDeleteJournal() {
        try {
            await deleteJournalEntry(journal._id);
            router.push("/");
            router.refresh();
        } catch (error) {
            toastError(error as Error);
        }
    }

    return (
        // todo mobile friendly
        <div className="flex flex-col  justify-center items-center mx-60 gap-5">
            {isEditMode ? (
                <>
                    <div className="w-full">
                        <AddJournalForm
                            onSubmit={onEditJournal}
                            existingJournal={journal}
                            onCancel={() => setIsEditMode(false)}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-2xl">{journal.title}</h3>
                    <RichEditor
                        value={journal.content}
                        theme="bubble"
                        isDisabled
                    />
                    <Separator />
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-500">
                            {hasBeenEdited ? "Updated" : "Created"} at{" "}
                            {formatDate(
                                hasBeenEdited
                                    ? journal.updatedAt
                                    : journal.createdAt
                            )}
                        </p>
                        <div className="flex gap-2">
                            <>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditMode(true)}
                                >
                                    Edit
                                </Button>
                                <DeleteAlertButton onDelete={onDeleteJournal} />
                            </>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

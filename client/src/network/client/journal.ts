import { Journal } from "@/models/journal";
import { fetchData } from "../api";

interface JournalInput {
    title: string;
    content: string;
}

export async function createJournalEntry(
    journal: JournalInput
): Promise<Journal> {
    const response = await fetchData("/api/journals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(journal),
    });
    return response.json();
}

export async function updateJournalEntry(
    id: string,
    journal: JournalInput
): Promise<Journal> {
    const response = await fetchData(`/api/journals/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(journal),
    });
    return response.json();
}

export async function deleteJournalEntry(id: string) {
    await fetchData(`/api/journals/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
}

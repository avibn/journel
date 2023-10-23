import { Journal } from "@/models/journal";
import { cookies } from "next/headers";
import { fetchData } from "../api";

export async function fetchAllJournalEntries(): Promise<Journal[]> {
    const response = await fetchData("/api/journals", {
        method: "GET",
        headers: {
            Cookie: cookies().toString(),
        },
    });
    return response.json();
}

export async function fetchAllJournalEntriesForYear(
    year: string
): Promise<Journal[]> {
    const response = await fetchData(
        "/api/journals?" + new URLSearchParams({ year }),
        {
            method: "GET",
            headers: {
                Cookie: cookies().toString(),
            },
        }
    );
    return response.json();
}

export async function fetchLimitJournalEntries(
    limit: number
): Promise<Journal[]> {
    const response = await fetchData(
        "/api/journals?" + new URLSearchParams({ limit: limit.toString() }),
        {
            method: "GET",
            headers: {
                Cookie: cookies().toString(),
            },
        }
    );
    return response.json();
}

export type JournalActiveYearsResponse =
    | [
          {
              year: number;
              count: number;
          }
      ]
    | [];

export async function fetchJournallingActiveYears(): Promise<JournalActiveYearsResponse> {
    const response = await fetchData("/api/journals/active-years", {
        method: "GET",
        headers: {
            Cookie: cookies().toString(),
        },
    });
    return response.json();
}

export async function fetchJournalEntry(id: string): Promise<Journal> {
    const response = await fetchData(`/api/journals/${id}`, {
        method: "GET",
        headers: {
            Cookie: cookies().toString(),
        },
    });
    return response.json();
}

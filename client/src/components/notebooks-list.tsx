import { JournalActiveYearsResponse } from "@/network/server/journal";
import Link from "next/link";
import { serverJournal } from "@/network/server";

export const NotebooksList = async () => {
    // Fetch active years
    let activeYears: JournalActiveYearsResponse;
    try {
        activeYears = await serverJournal.fetchJournallingActiveYears();
    } catch (error) {
        activeYears = [];
    }

    return (
        <>
            {activeYears.map(({ year, count }) => (
                <Link href={`/journals/year/${year}`} key={year}>
                    <div
                        className="flex flex-col items-center justify-center w-48 h-48 m-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 duration-500"
                        key={year}
                    >
                        <p className="text-2xl font-bold">{year}</p>
                        <p className="text-gray-500">{count} entries</p>
                    </div>
                </Link>
            ))}
        </>
    );
};

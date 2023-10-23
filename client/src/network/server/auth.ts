import { User } from "@/models/user";
import { cookies } from "next/headers";
import { fetchData } from "../api";

export async function fetchLoggedinUser(): Promise<User> {
    const response = await fetchData("/api/auth", {
        method: "GET",
        headers: {
            Cookie: cookies().toString(),
        },
    });
    return response.json();
}

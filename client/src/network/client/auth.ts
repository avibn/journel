import { User } from "@/models/user";
import { fetchData } from "../api";

interface LoginBody {
    username: string;
    password: string;
}

export async function loginUser(body: LoginBody): Promise<User> {
    const response = await fetchData("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    return response.json();
}

interface SignupBody extends LoginBody {
    email: string;
}

export async function signupUser(body: SignupBody): Promise<User> {
    const response = await fetchData("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    return response.json();
}

export async function logoutUser() {
    await fetchData("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });
}

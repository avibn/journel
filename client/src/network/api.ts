import { statusCodeErrorMap } from "@/app/errors/http-errors";

export async function fetchData(input: RequestInfo, init: RequestInit = {}) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

    // Check for network errors
    let response;
    try {
        response = await fetch(baseURL + input, init);
    } catch (error) {
        throw new Error("Network error - unable to connect to the server.");
    }

    // Check for HTTP errors
    if (response.ok) {
        return response;
    } else {
        const body = await response.json();
        const errorMessage = body.error;

        if (response.status in statusCodeErrorMap) {
            throw new statusCodeErrorMap[response.status](errorMessage);
        }

        // Other HTTP errors not in the map
        throw new Error(
            "Something went wrong: " + response.status + " : " + errorMessage
        );
    }
}

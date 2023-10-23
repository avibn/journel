import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

function useAuth() {
    const { user, setUser } = useContext(AuthContext);
    return { user, setUser };
}

export default useAuth;

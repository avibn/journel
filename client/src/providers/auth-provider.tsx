"use client";

import React, { ReactNode, createContext, useState } from "react";

import { User } from "@/models/user";

type authUser = User | null;

interface AuthContextType {
    user: authUser;
    setUser: React.Dispatch<React.SetStateAction<authUser>>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => null,
});

export const AuthProvider: React.FC<{
    loggedInUser: authUser;
    children: ReactNode;
}> = ({ loggedInUser, children }) => {
    const [user, setUser] = useState<authUser>(loggedInUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

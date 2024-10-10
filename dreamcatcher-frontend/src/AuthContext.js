import React, { createContext, useState, useEffect } from "react";
import api from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")) || null;

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("authToken", authToken);
            api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
        } else {
            localStorage.removeItem("authToken");
            delete api.defaults.headers.common["Authorization"];
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider> 
    );
};

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (token && savedUser) {
                setUser(JSON.parse(savedUser));
                // Optional: Verify token validity specifically here if needed
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            // Use hosted URL if deployed, or localhost
            const res = await axios.post("http://localhost:5000/login", { email, password });
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Login failed" };
        }
    };

    const signup = async (name, email, password) => {
        try {
            await axios.post("http://localhost:5000/signup", { name, email, password });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Signup failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
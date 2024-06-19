import { useContext, createContext, FC, ReactNode, useState } from "react";


interface AdminShortInterface {
    email: string,
    phone: string,
    name: string,
    photo: string
}

type SetAdmin = (value: { email: string, phone: string, name: string, photo: string }) => void;


interface AdminContextType {
    admin: AdminShortInterface | null,
    setAdmin: SetAdmin,
    loading: boolean,
    setLoading: (value: boolean) => void,
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [admin, setAdmin] = useState<AdminShortInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    return <AdminContext.Provider value={{ admin, setAdmin, setLoading, loading }}>
        {children}
    </AdminContext.Provider>
}

export default (): AdminContextType => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within a ToggleProvider');
    }
    return context;
}
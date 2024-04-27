import Header from "@/components/Header";
import type { Metadata } from "next";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: "IST Hub",
    description: "IST hub is a website for ISTians",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

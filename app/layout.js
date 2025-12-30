import { Inter } from "next/font/google";
import "./globals.css";
import { CourierProvider } from "./context/CourierContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Courier Order Tracking",
    description: "Real-time order tracking system for couriers",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <CourierProvider>
            {children}
        </CourierProvider>
        </body>
        </html>
    );
}
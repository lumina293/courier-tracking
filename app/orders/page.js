"use client";

import { useCourier } from "../context/CourierContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function OrdersPage() {
    const { currentCourier, logout } = useCourier();
    const router = useRouter();

    // Redirect to login if not logged in
    useEffect(() => {
        if (!currentCourier) {
            router.push("/");
        }
    }, [currentCourier, router]);

    // Handle logout
    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (!currentCourier) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-sm text-gray-500">
                                Logged in as {currentCourier.name}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <p className="text-gray-600">
                        Orders list coming in Step 4...
                    </p>
                </div>
            </main>
        </div>
    );
}
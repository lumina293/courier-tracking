"use client";

import { useCourier } from "../context/CourierContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import OrderCard from "../components/OrderCard";

export default function OrdersPage() {
    const { currentCourier, logout, getCourierOrders, lastRefresh } = useCourier();
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

    // Get orders for current courier
    const orders = getCourierOrders();

    // Count orders by type
    const activeOrders = orders.filter(
        (o) => !["DELIVERED", "RETURNED"].includes(o.status)
    ).length;
    const errorOrders = orders.filter((o) => o.errorReason !== null).length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
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

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active</p>
                                <p className="text-2xl font-bold text-blue-600">{activeOrders}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Issues</p>
                                <p className="text-2xl font-bold text-red-600">{errorOrders}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Last updated</p>
                            <p className="text-sm font-medium text-gray-700">
                                {lastRefresh.toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No orders assigned to you.</p>
                    </div>
                )}

                {/* Orders Grid */}
                {orders.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
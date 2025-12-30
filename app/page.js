"use client";

import { useCourier } from "./context/CourierContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function LoginPage() {
    const { allCouriers, login } = useCourier();
    const router = useRouter();

    // Handle courier selection
    const handleLogin = (courierId) => {
        const success = login(courierId);
        if (success) {
            // Redirect to orders page
            router.push("/orders");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-indigo-600 p-3 rounded-full">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Courier Order Tracking
                    </h1>
                    <p className="text-gray-600">
                        Select your profile to access your assigned orders
                    </p>
                </div>

                {/* Courier Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allCouriers.map((courier) => (
                        <Card
                            key={courier.id}
                            className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-indigo-500"
                            onClick={() => handleLogin(courier.id)}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{courier.name}</span>
                                    <span className="text-sm font-normal text-gray-500">
                    {courier.id}
                  </span>
                                </CardTitle>
                                <CardDescription>{courier.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">{courier.phone}</p>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    Login as {courier.name.split(" ")[0]}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Demo System • Click any profile to continue
                    </p>
                </div>
            </div>
        </div>
    );
}
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { MapPin, User, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderCard({ order }) {
    const router = useRouter();

    // Format time for display
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Check if order has error
    const hasError = order.errorReason !== null;

    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
                hasError ? "border-l-4 border-l-red-500" : ""
            }`}
            onClick={() => router.push(`/orders/${order.id}`)}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <User className="w-3.5 h-3.5" />
                            {order.customerName}
                        </p>
                    </div>
                    <StatusBadge status={order.status} />
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Pickup Location */}
                <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">PICKUP</p>
                        <p className="text-sm text-gray-900">{order.pickupLocation}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatTime(order.expectedPickupTime)}
                        </p>
                    </div>
                </div>

                {/* Delivery Location */}
                <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">DELIVERY</p>
                        <p className="text-sm text-gray-900">{order.deliveryLocation}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatTime(order.expectedDeliveryTime)}
                        </p>
                    </div>
                </div>

                {/* Error Message (if exists) */}
                {hasError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-2 mt-2">
                        <p className="text-xs font-medium text-red-700">⚠️ Issue Detected</p>
                        <p className="text-xs text-red-600 mt-0.5">{order.errorReason}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUSES } from "@/app/lib/mockData";
import {
    Package,
    PackageCheck,
    Truck,
    CheckCircle,
    Clock,
    AlertTriangle,
    XCircle,
    PackageX
} from "lucide-react";

export default function StatusBadge({ status }) {
    const statusInfo = ORDER_STATUSES[status];

    if (!statusInfo) {
        return <Badge variant="outline">Unknown</Badge>;
    }

    // Map colors to badge variants and styles
    const colorMap = {
        blue: { variant: "outline", className: "border-blue-500 text-blue-700 bg-blue-50" },
        green: { variant: "outline", className: "border-green-500 text-green-700 bg-green-50" },
        yellow: { variant: "outline", className: "border-yellow-500 text-yellow-700 bg-yellow-50" },
        red: { variant: "outline", className: "border-red-500 text-red-700 bg-red-50" },
        gray: { variant: "outline", className: "border-gray-500 text-gray-700 bg-gray-50" },
    };

    // Map status to icons
    const iconMap = {
        PENDING: Clock,
        PICKED_UP: PackageCheck,
        IN_TRANSIT: Truck,
        DELIVERED: CheckCircle,
        PICKUP_DELAYED: AlertTriangle,
        DELIVERY_DELAYED: AlertTriangle,
        DELIVERY_FAILED: XCircle,
        DAMAGED: PackageX,
        RETURNED: Package,
    };

    const Icon = iconMap[status] || Package;
    const style = colorMap[statusInfo.color] || colorMap.gray;

    return (
        <Badge variant={style.variant} className={`${style.className} flex items-center gap-1.5 w-fit`}>
            <Icon className="w-3.5 h-3.5" />
            {statusInfo.label}
        </Badge>
    );
}
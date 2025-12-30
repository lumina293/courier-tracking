// Mock Couriers
export const mockCouriers = [
    {
        id: "C001",
        name: "John Doe",
        email: "john.doe@courier.com",
        phone: "+1 (555) 123-4567",
    },
    {
        id: "C002",
        name: "Jane Smith",
        email: "jane.smith@courier.com",
        phone: "+1 (555) 234-5678",
    },
    {
        id: "C003",
        name: "Mike Johnson",
        email: "mike.johnson@courier.com",
        phone: "+1 (555) 345-6789",
    },
];

// Order statuses with their display info
export const ORDER_STATUSES = {
    PENDING: { label: "Pending Pickup", color: "blue", type: "normal" },
    PICKED_UP: { label: "Picked Up", color: "green", type: "normal" },
    IN_TRANSIT: { label: "In Transit", color: "green", type: "normal" },
    DELIVERED: { label: "Delivered", color: "green", type: "normal" },
    PICKUP_DELAYED: { label: "Pickup Delayed", color: "yellow", type: "warning" },
    DELIVERY_DELAYED: { label: "Delivery Delayed", color: "yellow", type: "warning" },
    DELIVERY_FAILED: { label: "Delivery Failed", color: "red", type: "error" },
    DAMAGED: { label: "Damaged", color: "red", type: "error" },
    RETURNED: { label: "Returned", color: "gray", type: "normal" },
};

// Helper to generate timestamps
const getTimestamp = (hoursAgo) => {
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);
    return date.toISOString();
};

// Mock Orders
export const mockOrders = [
    // John Doe's orders (C001)
    {
        id: "ORD-001",
        courierId: "C001",
        status: "IN_TRANSIT",
        pickupLocation: "123 Main St, Downtown",
        deliveryLocation: "456 Oak Ave, Uptown",
        expectedPickupTime: getTimestamp(2),
        expectedDeliveryTime: getTimestamp(-1), // 1 hour from now
        customerName: "Alice Brown",
        customerPhone: "+1 (555) 111-2222",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(3), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(2), note: "Package collected from sender" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(1), note: "En route to destination" },
        ],
        errorReason: null,
    },
    {
        id: "ORD-002",
        courierId: "C001",
        status: "DELIVERY_FAILED",
        pickupLocation: "789 Park Blvd, Midtown",
        deliveryLocation: "321 Pine St, Suburbs",
        expectedPickupTime: getTimestamp(5),
        expectedDeliveryTime: getTimestamp(1),
        customerName: "Bob Wilson",
        customerPhone: "+1 (555) 222-3333",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(6), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(5), note: "Package collected" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(3), note: "On the way" },
            { status: "DELIVERY_FAILED", timestamp: getTimestamp(1), note: "Recipient unavailable" },
        ],
        errorReason: "Recipient not at address - no response to doorbell",
    },
    {
        id: "ORD-003",
        courierId: "C001",
        status: "PENDING",
        pickupLocation: "555 Commerce Dr, Industrial Park",
        deliveryLocation: "888 Maple Rd, Eastside",
        expectedPickupTime: getTimestamp(-0.5), // 30 min from now
        expectedDeliveryTime: getTimestamp(-2),
        customerName: "Carol Davis",
        customerPhone: "+1 (555) 333-4444",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(0.5), note: "Order assigned" },
        ],
        errorReason: null,
    },
    {
        id: "ORD-004",
        courierId: "C001",
        status: "PICKUP_DELAYED",
        pickupLocation: "222 Harbor Way, Dockside",
        deliveryLocation: "999 Elm St, Westside",
        expectedPickupTime: getTimestamp(1),
        expectedDeliveryTime: getTimestamp(-1.5),
        customerName: "David Lee",
        customerPhone: "+1 (555) 444-5555",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(2), note: "Order assigned" },
            { status: "PICKUP_DELAYED", timestamp: getTimestamp(0.5), note: "Warehouse not ready" },
        ],
        errorReason: "Pickup location experiencing delays - warehouse staff unavailable",
    },
    {
        id: "ORD-005",
        courierId: "C001",
        status: "DELIVERED",
        pickupLocation: "111 Broadway, City Center",
        deliveryLocation: "777 River Rd, Northside",
        expectedPickupTime: getTimestamp(8),
        expectedDeliveryTime: getTimestamp(6),
        customerName: "Emma Garcia",
        customerPhone: "+1 (555) 555-6666",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(9), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(8), note: "Package collected" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(7), note: "On the way" },
            { status: "DELIVERED", timestamp: getTimestamp(6), note: "Successfully delivered" },
        ],
        errorReason: null,
    },

    // Jane Smith's orders (C002)
    {
        id: "ORD-006",
        courierId: "C002",
        status: "DAMAGED",
        pickupLocation: "444 Industrial Ave, Factory District",
        deliveryLocation: "666 Cedar Ln, Southside",
        expectedPickupTime: getTimestamp(4),
        expectedDeliveryTime: getTimestamp(2),
        customerName: "Frank Martinez",
        customerPhone: "+1 (555) 666-7777",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(5), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(4), note: "Package collected" },
            { status: "DAMAGED", timestamp: getTimestamp(2), note: "Package damaged during handling" },
        ],
        errorReason: "Box crushed during loading - contents appear damaged",
    },
    {
        id: "ORD-007",
        courierId: "C002",
        status: "IN_TRANSIT",
        pickupLocation: "333 Tech Park, Silicon Valley",
        deliveryLocation: "555 Innovation Dr, Research Park",
        expectedPickupTime: getTimestamp(1),
        expectedDeliveryTime: getTimestamp(-2),
        customerName: "Grace Kim",
        customerPhone: "+1 (555) 777-8888",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(2), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(1), note: "Package collected" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(0.5), note: "En route" },
        ],
        errorReason: null,
    },
    {
        id: "ORD-008",
        courierId: "C002",
        status: "PENDING",
        pickupLocation: "888 Retail Plaza, Shopping District",
        deliveryLocation: "222 University Ave, Campus",
        expectedPickupTime: getTimestamp(-1),
        expectedDeliveryTime: getTimestamp(-3),
        customerName: "Henry Patel",
        customerPhone: "+1 (555) 888-9999",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(0.2), note: "Order assigned" },
        ],
        errorReason: null,
    },

    // Mike Johnson's orders (C003)
    {
        id: "ORD-009",
        courierId: "C003",
        status: "PICKED_UP",
        pickupLocation: "999 Medical Center Dr, Hospital District",
        deliveryLocation: "111 Residential St, Suburbs",
        expectedPickupTime: getTimestamp(0.5),
        expectedDeliveryTime: getTimestamp(-1),
        customerName: "Iris Chen",
        customerPhone: "+1 (555) 999-0000",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(1), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(0.5), note: "Package collected" },
        ],
        errorReason: null,
    },
    {
        id: "ORD-010",
        courierId: "C003",
        status: "DELIVERY_DELAYED",
        pickupLocation: "777 Airport Rd, Cargo Terminal",
        deliveryLocation: "444 Business Park, Corporate Center",
        expectedPickupTime: getTimestamp(3),
        expectedDeliveryTime: getTimestamp(1),
        customerName: "Jack Thompson",
        customerPhone: "+1 (555) 000-1111",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(4), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(3), note: "Package collected" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(2), note: "En route" },
            { status: "DELIVERY_DELAYED", timestamp: getTimestamp(0.8), note: "Traffic accident on route" },
        ],
        errorReason: "Heavy traffic due to accident - estimated 45 min delay",
    },
    {
        id: "ORD-011",
        courierId: "C003",
        status: "DELIVERED",
        pickupLocation: "555 Station Rd, Transit Hub",
        deliveryLocation: "888 Market St, Downtown",
        expectedPickupTime: getTimestamp(10),
        expectedDeliveryTime: getTimestamp(8),
        customerName: "Kate Rodriguez",
        customerPhone: "+1 (555) 111-2222",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(11), note: "Order assigned" },
            { status: "PICKED_UP", timestamp: getTimestamp(10), note: "Package collected" },
            { status: "IN_TRANSIT", timestamp: getTimestamp(9), note: "En route" },
            { status: "DELIVERED", timestamp: getTimestamp(8), note: "Delivered successfully" },
        ],
        errorReason: null,
    },
    {
        id: "ORD-012",
        courierId: "C003",
        status: "PENDING",
        pickupLocation: "333 Warehouse Blvd, Storage District",
        deliveryLocation: "666 Apartment Complex, Residential",
        expectedPickupTime: getTimestamp(-0.3),
        expectedDeliveryTime: getTimestamp(-2.5),
        customerName: "Leo Murphy",
        customerPhone: "+1 (555) 222-3333",
        statusHistory: [
            { status: "PENDING", timestamp: getTimestamp(0.1), note: "Order assigned" },
        ],
        errorReason: null,
    },
];
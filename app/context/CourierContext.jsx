"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { mockCouriers, mockOrders } from "@/app/lib/mockData";

// Create the context
const CourierContext = createContext();

// Custom hook to use the context
export const useCourier = () => {
    const context = useContext(CourierContext);
    if (!context) {
        throw new Error("useCourier must be used within CourierProvider");
    }
    return context;
};

// Provider component
export const CourierProvider = ({ children }) => {
    // Current logged-in courier
    const [currentCourier, setCurrentCourier] = useState(null);

    // All orders (we'll simulate updates to this)
    const [orders, setOrders] = useState(mockOrders);

    // Last refresh timestamp
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // Login function - sets the current courier
    const login = (courierId) => {
        const courier = mockCouriers.find((c) => c.id === courierId);
        if (courier) {
            setCurrentCourier(courier);
            return true;
        }
        return false;
    };

    // Logout function
    const logout = () => {
        setCurrentCourier(null);
    };

    // Get orders for current courier
    const getCourierOrders = () => {
        if (!currentCourier) return [];
        return orders.filter((order) => order.courierId === currentCourier.id);
    };

    // Get single order by ID
    const getOrderById = (orderId) => {
        return orders.find((order) => order.id === orderId);
    };

    // Update order status (for future actions like marking failed, delayed, etc.)
    const updateOrderStatus = (orderId, newStatus, note, errorReason = null) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => {
                if (order.id === orderId) {
                    const newHistoryEntry = {
                        status: newStatus,
                        timestamp: new Date().toISOString(),
                        note: note || `Status changed to ${newStatus}`,
                    };

                    return {
                        ...order,
                        status: newStatus,
                        statusHistory: [...order.statusHistory, newHistoryEntry],
                        errorReason: errorReason,
                    };
                }
                return order;
            })
        );
        setLastRefresh(new Date());
    };

    // Simulate real-time updates (will be used in auto-refresh)
    const simulateStatusChange = () => {
        // Pick a random order that's not delivered or returned
        const activeOrders = orders.filter(
            (o) => o.status !== "DELIVERED" && o.status !== "RETURNED" && o.status !== "DAMAGED"
        );

        if (activeOrders.length === 0) return;

        const randomOrder = activeOrders[Math.floor(Math.random() * activeOrders.length)];

        // Define status progression logic
        const statusProgression = {
            PENDING: ["PICKED_UP", "PICKUP_DELAYED"],
            PICKED_UP: ["IN_TRANSIT"],
            IN_TRANSIT: ["DELIVERED", "DELIVERY_DELAYED", "DELIVERY_FAILED"],
            PICKUP_DELAYED: ["PICKED_UP"],
            DELIVERY_DELAYED: ["DELIVERED", "DELIVERY_FAILED"],
            DELIVERY_FAILED: ["RETURNED"],
        };

        const possibleNextStatuses = statusProgression[randomOrder.status];
        if (possibleNextStatuses && possibleNextStatuses.length > 0) {
            const nextStatus = possibleNextStatuses[Math.floor(Math.random() * possibleNextStatuses.length)];

            // Add appropriate error reason for error statuses
            let errorReason = null;
            if (nextStatus === "DELIVERY_FAILED") {
                errorReason = "Simulated delivery failure";
            } else if (nextStatus === "PICKUP_DELAYED") {
                errorReason = "Simulated pickup delay";
            } else if (nextStatus === "DELIVERY_DELAYED") {
                errorReason = "Simulated delivery delay";
            }

            updateOrderStatus(randomOrder.id, nextStatus, `Auto-updated to ${nextStatus}`, errorReason);
        }
    };

    // Manual refresh function
    const refreshOrders = () => {
        setLastRefresh(new Date());
        // In real app, this would fetch from API
        // For now, just update timestamp
    };

    const value = {
        currentCourier,
        orders,
        lastRefresh,
        allCouriers: mockCouriers,
        login,
        logout,
        getCourierOrders,
        getOrderById,
        updateOrderStatus,
        simulateStatusChange,
        refreshOrders,
    };

    return (
        <CourierContext.Provider value={value}>
            {children}
        </CourierContext.Provider>
    );
};

import { useState, useCallback, useEffect } from "react";
import { DashboardStats } from "@/lib/api/dashboard";
import { fetchDashboardStats } from "@/lib/actions/dashboard-action";

export const useDashboard = () => {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchDashboardStats();
            if (result.success && result.data) {
                setData(result.data);
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load dashboard stats");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    return {
        data,
        loading,
        error,
        refresh: loadStats
    };
};

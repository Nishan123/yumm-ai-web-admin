
import { getDashboardStats } from "../api/dashboard";
import { DashboardStats } from "../api/dashboard";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export const fetchDashboardStats = async (): Promise<ActionResult<DashboardStats>> => {
    try {
        const data = await getDashboardStats();
        return {
            success: true,
            message: "Dashboard stats fetched successfully",
            data,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch dashboard stats",
        };
    }
};

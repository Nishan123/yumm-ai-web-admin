
import axios from "@/lib/api/axios";
import { API } from "../endpoints";

export interface DashboardStats {
    stats: {
        totalUsers: number;
        totalRecipes: number;
        activeSessions: number;
        openBugReports: number;
    };
    growth: {
        name: string;
        total: number;
    }[];
    activity: {
        user: string;
        action: string;
        type: "recipe" | "user" | "bug";
        date: string;
        details?: string;
    }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await axios.get(API.DASHBOARD.STATS);
    return response.data;
};

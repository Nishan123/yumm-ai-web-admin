import axiosInstance from "../axios";
import { API } from "../endpoints";

export interface SendNotificationPayload {
    title: string;
    message: string;
    targetAudience: "all" | "subscribed" | "unsubscribed";
}

export const notificationApi = {
    sendNotification: async (payload: SendNotificationPayload) => {
        try {
            const response = await axiosInstance.post(API.NOTIFICATIONS.SEND, payload);
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to send notification"
            };
        }
    },
    getLogs: async (page: number = 1, limit: number = 20) => {
        try {
            const response = await axiosInstance.get(`${API.NOTIFICATIONS.LOGS}?page=${page}&limit=${limit}`);
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to fetch logs"
            };
        }
    },
    deleteLog: async (id: string) => {
        try {
            const response = await axiosInstance.delete(API.NOTIFICATIONS.DELETE(id));
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to delete log"
            };
        }
    }
}

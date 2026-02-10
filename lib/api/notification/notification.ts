import axiosInstance from "../axios";
import { API } from "../endpoints";

export interface SendNotificationPayload {
    title: string;
    message: string;
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
    }
};

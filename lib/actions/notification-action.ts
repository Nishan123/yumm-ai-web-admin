
import { notificationApi, SendNotificationPayload } from "../api/notification/notification";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export const sendNotificationAction = async (formData: FormData): Promise<ActionResult> => {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    const targetAudience = (formData.get("targetAudience") as "all" | "subscribed" | "unsubscribed") || "all";

    if (!title || !message) {
        return {
            success: false,
            message: "Title and message are required"
        };
    }

    try {
        const payload: SendNotificationPayload = { title, message, targetAudience };
        const result = await notificationApi.sendNotification(payload);

        if (result.success) {
            // revalidatePath is not available in client components/actions
            return {
                success: true,
                message: "Notification sent successfully"
            };
        }

        return {
            success: false,
            message: result.message || "Failed to send notification"
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "An unexpected error occurred"
        };
    }
};

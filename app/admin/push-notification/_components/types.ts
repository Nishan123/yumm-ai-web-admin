export interface NotificationLog {
    _id: string;
    title: string;
    message: string;
    targetAudience: string;
    sentCount: number;
    failureCount: number;
    status: "success" | "failed" | "partial";
    createdAt: string;
}

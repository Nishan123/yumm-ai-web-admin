import api from "../axios";
import { API } from "../endpoints";
import { User } from "../user/user";

export enum BugReportStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in-progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
}

export interface BugReport {
    _id: string;
    description: string; // Mapped from reportDescription in UI or transformer
    reportDescription: string;
    problemType: string;
    steps?: string;
    screenshot?: string;
    screenshotUrl?: string;
    priority?: string; // Not in backend yet
    status: BugReportStatus;
    reportedBy: string; // Backend returns email string
    userId?: string;
    createdAt: string;
    updatedAt: string;
    deviceInfo?: Record<string, any>;
    appVersion?: string;
}

export interface BugReportsResponse {
    success: boolean;
    data: {
        reports: BugReport[];
        pagination: {
            page: number;
            size: number;
            total: number;
            totalPages: number;
        };
    };
    message?: string;
}

export interface BugReportResponse {
    success: boolean;
    data: BugReport;
    message?: string;
}

export const bugReportApi = {
    getAllBugReports: async (page: number = 1, size: number = 10, status?: string): Promise<BugReportsResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            ...(status && { status })
        });
        const response = await api.get<BugReportsResponse>(API.BUG_REPORTS.GET_ALL(params.toString()));
        return response.data;
    },

    getBugReportById: async (id: string): Promise<BugReportResponse> => {
        const response = await api.get<BugReportResponse>(API.BUG_REPORTS.GET_ONE(id));
        return response.data;
    },

    updateBugReportStatus: async (id: string, status: BugReportStatus): Promise<BugReportResponse> => {
        const response = await api.patch<BugReportResponse>(API.BUG_REPORTS.UPDATE_STATUS(id), { status });
        return response.data;
    },

    deleteBugReport: async (id: string): Promise<any> => {
        const response = await api.delete(API.BUG_REPORTS.DELETE(id));
        return response.data;
    },
};

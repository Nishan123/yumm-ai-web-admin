import { bugReportApi, BugReportStatus } from "../api/bug-reports/bug-report";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

// Get all bug reports with pagination
export const fetchAllBugReports = async (
    page: number = 1,
    size: number = 10,
    status?: string
): Promise<ActionResult> => {
    try {
        const result = await bugReportApi.getAllBugReports(page, size, status);
        if (result.success && result.data) {
            return {
                success: true,
                message: "Bug reports fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch bug reports"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch bug reports"
        };
    }
};

// Get bug report by ID
export const fetchBugReportById = async (id: string): Promise<ActionResult> => {
    try {
        const result = await bugReportApi.getBugReportById(id);
        if (result.success && result.data) {
            return {
                success: true,
                message: "Bug report fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch bug report"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch bug report"
        };
    }
};

// Update bug report status
export const updateBugReportStatus = async (id: string, status: BugReportStatus): Promise<ActionResult> => {
    try {
        const result = await bugReportApi.updateBugReportStatus(id, status);
        if (result.success) {
            return {
                success: true,
                message: "Bug report status updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update bug report status"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update bug report status"
        };
    }
};

// Delete bug report
export const deleteBugReport = async (id: string): Promise<ActionResult> => {
    try {
        const result = await bugReportApi.deleteBugReport(id);
        if (result.success) {
            return {
                success: true,
                message: "Bug report deleted successfully"
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete bug report"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to delete bug report"
        };
    }
};

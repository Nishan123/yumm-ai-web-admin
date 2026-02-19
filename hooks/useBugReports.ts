import { useState, useCallback } from "react";
import { BugReport, BugReportStatus } from "@/lib/api/bug-reports/bug-report";
import { fetchAllBugReports, updateBugReportStatus, deleteBugReport } from "@/lib/actions/bug-report-action";

export const useBugReports = () => {
    const [reports, setReports] = useState<BugReport[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        total: 0,
        totalPages: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const loadReports = useCallback(async (page: number = 1, size: number = 10, status?: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAllBugReports(page, size, status);
            if (result.success && result.data) {
                setReports(result.data.reports || []);
                if (result.data.pagination) {
                    setPagination(result.data.pagination);
                }
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load reports");
        } finally {
            setLoading(false);
        }
    }, []);

    const updateStatus = async (id: string, status: BugReportStatus) => {
        const result = await updateBugReportStatus(id, status);
        if (result.success) {
            // Optimistic update
            setReports(prev => prev.map(report =>
                report._id === id ? { ...report, status } : report
            ));
            return true;
        }
        return false;
    };

    const removeReport = async (id: string) => {
        const result = await deleteBugReport(id);
        if (result.success) {
            setReports(prev => prev.filter(report => report._id !== id));
            return true;
        }
        return false;
    };

    return {
        reports,
        loading,
        pagination,
        error,
        loadReports,
        updateStatus,
        removeReport
    };
};

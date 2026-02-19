"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  fetchBugReportById,
  updateBugReportStatus,
  deleteBugReport,
} from "@/lib/actions/bug-report-action";
import { BugReportStatus, BugReport } from "@/lib/api/bug-reports/bug-report";

const BugReportDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [report, setReport] = useState<BugReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadReport(params.id as string);
    }
  }, [params.id]);

  const loadReport = async (id: string) => {
    const result = await fetchBugReportById(id);
    if (result.success && result.data) {
      setReport(result.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: BugReportStatus) => {
    if (!report) return;
    if (confirm(`Change status to ${newStatus}?`)) {
      const result = await updateBugReportStatus(report._id, newStatus);
      if (result.success) {
        setReport({ ...report, status: newStatus });
      } else {
        alert("Failed to update status");
      }
    }
  };

  const handleDelete = async () => {
    if (!report) return;
    if (confirm("Are you sure you want to delete this report?")) {
      const result = await deleteBugReport(report._id);
      if (result.success) {
        router.push("/admin/bug-reports");
      } else {
        alert("Failed to delete report");
      }
    }
  };

  const getStatusColor = (status: BugReportStatus) => {
    switch (status) {
      case BugReportStatus.OPEN:
        return "bg-red-100 text-red-800";
      case BugReportStatus.IN_PROGRESS:
        return "bg-yellow-100 text-yellow-800";
      case BugReportStatus.RESOLVED:
        return "bg-green-100 text-green-800";
      case BugReportStatus.CLOSED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-8">Loading report details...</div>;
  }

  if (!report) {
    return <div className="p-8">Report not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bug Report Details</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Issue #{report._id.slice(-6)}
            </h2>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(report.status)}`}
            >
              {report.status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-gray-900">
              {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
              {report.reportDescription}
            </p>
          </div>

          {report.steps && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Steps to Reproduce</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {report.steps}
              </p>
            </div>
          )}

          {report.screenshotUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Screenshot</h3>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={report.screenshotUrl}
                  alt="Bug Screenshot"
                  className="max-w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Reported By
              </h3>
              {report.reportedBy ? (
                <div>
                  <p className="font-medium text-gray-900">
                    {report.reportedBy}
                  </p>
                </div>
              ) : (
                <p className="text-gray-900">Unknown User</p>
              )}
            </div>

            {report.deviceInfo && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Device Info
                </h3>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(report.deviceInfo, null, 2)}
                </pre>
              </div>
            )}

            {report.appVersion && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  App Version
                </h3>
                <p className="text-gray-900">{report.appVersion}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-8 border-t mt-8">
            <select
              value={report.status}
              onChange={(e) =>
                handleStatusChange(e.target.value as BugReportStatus)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              {Object.values(BugReportStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-auto"
            >
              Delete Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugReportDetailPage;

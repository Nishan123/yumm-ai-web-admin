import { BugReportStatus, BugReport } from "@/lib/api/bug-reports/bug-report";
import { useRouter } from "next/navigation";

interface BugReportsTableProps {
  reports: BugReport[];
  getStatusColor: (status: BugReportStatus) => string;
  handleStatusChange: (id: string, newStatus: BugReportStatus) => void;
  handleDelete: (id: string) => void;
  loading: boolean;
}

export const BugReportsTable = ({
  reports,
  getStatusColor,
  handleStatusChange,
  handleDelete,
  loading,
}: BugReportsTableProps) => {
  const router = useRouter();

  if (loading && (!reports || reports.length === 0)) {
    return <div className="p-8">Loading bug reports...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Problem Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reported By (Email)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports &&
            reports.length > 0 &&
            reports.map((report) => (
              <tr
                key={report._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/admin/bug-reports/${report._id}`)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {report.problemType}
                  </div>
                  <div
                    className="text-xs text-gray-500 line-clamp-1 max-w-xs "
                    title={report.reportDescription}
                  >
                    {report.reportDescription}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {report.reportedBy}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={report.status}
                    onChange={(e) =>
                      handleStatusChange(
                        report._id,
                        e.target.value as BugReportStatus,
                      )
                    }
                    className="text-sm border-gray-300 rounded mr-4"
                  >
                    {Object.values(BugReportStatus).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {reports.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No bug reports found.
        </div>
      )}
    </div>
  );
};

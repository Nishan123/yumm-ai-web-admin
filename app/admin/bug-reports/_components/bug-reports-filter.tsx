import { BugReportStatus } from "@/lib/api/bug-reports/bug-report";

interface BugReportsFilterProps {
  statusFilter: BugReportStatus | "";
  setStatusFilter: (status: BugReportStatus | "") => void;
  setCurrentPage: (page: number) => void;
}

export const BugReportsFilter = ({
  statusFilter,
  setStatusFilter,
  setCurrentPage,
}: BugReportsFilterProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Bug Reports</h1>
      <div className="flex gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as BugReportStatus | "");
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Statuses</option>
          {Object.values(BugReportStatus).map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

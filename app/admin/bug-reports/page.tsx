"use client";

import { useState, useEffect } from "react";
import { useBugReports } from "@/hooks/useBugReports";
import { BugReportStatus } from "@/lib/api/bug-reports/bug-report";
import { BugReportsFilter } from "./_components/bug-reports-filter";
import { BugReportsTable } from "./_components/bug-reports-table";
import { BugReportsPagination } from "./_components/bug-reports-pagination";

const BugReportsPage = () => {
  const {
    reports,
    loading,
    pagination,
    loadReports,
    updateStatus,
    removeReport,
  } = useBugReports();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<BugReportStatus | "">("");

  useEffect(() => {
    loadReports(currentPage, 10, statusFilter);
  }, [currentPage, statusFilter, loadReports]);

  const handleStatusChange = async (id: string, newStatus: BugReportStatus) => {
    if (confirm(`Change status to ${newStatus}?`)) {
      await updateStatus(id, newStatus);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      await removeReport(id);
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

  if (loading && (!reports || reports.length === 0)) {
    return <div className="p-8">Loading bug reports...</div>;
  }

  return (
    <div className="p-8">
      <BugReportsFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
      />

      <BugReportsTable
        reports={reports}
        getStatusColor={getStatusColor}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
        loading={loading}
      />

      <BugReportsPagination
        currentPage={currentPage}
        total={pagination.total}
        totalPages={pagination.totalPages}
        length={reports.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BugReportsPage;

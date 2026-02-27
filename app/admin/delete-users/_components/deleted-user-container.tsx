"use client";

import { useState, useEffect } from "react";
import { getDeletedUsersAction } from "@/lib/actions/deleted-user-action";
import { DeletedUserTable } from "./deleted-user-table";
import { Search } from "lucide-react";

export const DeletedUserContainer = () => {
  const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadDeletedUsers();
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const loadDeletedUsers = async () => {
    setLoading(true);
    const result = await getDeletedUsersAction(
      currentPage,
      pageSize,
      searchTerm,
    );
    if (result.success && result.data) {
      setDeletedUsers(result.data.deletedUsers);
      setPagination(result.data.pagination);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Deleted User Records
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View historical data of users who deleted their accounts
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DeletedUserTable
          deletedUsers={deletedUsers}
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllUsers, handleDeleteUser } from "@/lib/actions";
import { UserTable } from "./user-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export const UserContainer = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
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

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadUsers();
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

  const loadUsers = async () => {
    setLoading(true);
    const result = await fetchAllUsers(currentPage, pageSize, searchTerm);
    if (result.success && result.data) {
      setUsers(result.data.users);
      setPagination(result.data.pagination);
    }
    setLoading(false);
  };

  const openDeleteDialog = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTimeout(() => setUserToDelete(null), 200);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    const result = await handleDeleteUser(userToDelete);
    if (result.success) {
      closeDeleteDialog();
      loadUsers();
    } else {
      alert(result.message || "Failed to delete user");
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="px-4 py-2 border border-gray-300 rounded-lg w-80"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
              title="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={() => router.push("/admin/users/create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8">Loading users...</div>
      ) : (
        <UserTable
          users={users}
          pagination={pagination}
          onPageChange={setCurrentPage}
          onDelete={openDeleteDialog}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

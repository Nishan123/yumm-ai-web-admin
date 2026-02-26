"use client";

import { useState, useEffect } from "react";
import {
  fetchAllRecipes,
  handleDeleteRecipe,
} from "@/lib/actions/recipe-action";
import { Recipe } from "@/lib/api/recipes/recipe";
import { RecipeTable } from "./recipe-table";
import { RecipeForm } from "./recipe-form";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export const RecipeContainer = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Delete dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadRecipes();
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

  const loadRecipes = async () => {
    setLoading(true);
    const result = await fetchAllRecipes(currentPage, pageSize, searchTerm);
    if (result.success && result.data) {
      setRecipes(result.data.recipe);
      setPagination(result.data.pagination);
    }
    setLoading(false);
  };

  const openEditModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => setSelectedRecipe(null), 200); // wait for animation
  };

  const openDeleteDialog = (id: string) => {
    setRecipeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTimeout(() => setRecipeToDelete(null), 200);
  };

  const handleDeleteConfirm = async () => {
    if (!recipeToDelete) return;
    setIsDeleting(true);

    const result = await handleDeleteRecipe(recipeToDelete);
    if (result.success) {
      closeDeleteDialog();
      loadRecipes(); // refresh list
    } else {
      alert(result.message || "Failed to delete recipe");
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Recipe Management</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search recipes..."
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
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium animate-pulse">
            Loading recipes...
          </p>
        </div>
      ) : (
        <RecipeTable
          recipes={recipes || []}
          pagination={pagination}
          onPageChange={setCurrentPage}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
        />
      )}

      {/* Edit Form Modal */}
      <RecipeForm
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        recipe={selectedRecipe}
        onSuccess={loadRecipes}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete Recipe"
        description="Are you sure you want to delete this recipe? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

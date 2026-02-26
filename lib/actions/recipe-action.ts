import { recipeApi, Recipe } from "../api/recipes/recipe";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

// Get all recipes with pagination
export const fetchAllRecipes = async (
    page: number = 1,
    size: number = 10,
    searchTerm?: string
): Promise<ActionResult> => {
    try {
        const result = await recipeApi.getAllRecipes(page, size, searchTerm);
        if (result.success && result.data) {
            return {
                success: true,
                message: "Recipes fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch recipes"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch recipes"
        };
    }
};

// Update recipe
export const handleUpdateRecipe = async (id: string, recipeData: Partial<Recipe>): Promise<ActionResult> => {
    try {
        const result = await recipeApi.updateRecipe(id, recipeData);
        if (result.success) {
            return {
                success: true,
                message: "Recipe updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update recipe"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update recipe"
        };
    }
};

// Delete recipe
export const handleDeleteRecipe = async (id: string): Promise<ActionResult> => {
    try {
        const result = await recipeApi.deleteRecipe(id);
        if (result.success) {
            return {
                success: true,
                message: "Recipe deleted successfully"
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete recipe"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to delete recipe"
        };
    }
};

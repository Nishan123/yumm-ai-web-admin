import api from "../axios";
import { API } from "../endpoints";

export interface Instruction {
    id: string;
    step?: string;
    instruction?: string;
    isDone?: boolean;
}

export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
}

export interface KitchenTool {
    id: string;
    name: string;
    imageUrl?: string;
}

export interface Recipe {
    recipeId: string;
    generatedBy: string;
    recipeName: string;
    ingredients: Ingredient[];
    steps: Instruction[];
    initialPreparation: Instruction[];
    kitchenTools: KitchenTool[];
    experienceLevel: "newBie" | "canCook" | "expert";
    estCookingTime: string;
    description: string;
    mealType: string;
    cuisine: string;
    calorie: number;
    images: string[];
    nutrition?: {
        protein?: number;
        carbs?: number;
        fat?: number;
        fiber?: number;
    };
    servings: number;
    likes: string[];
    dietaryRestrictions: string[];
    isPublic: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecipeResponse {
    success: boolean;
    data: Recipe;
    message?: string;
}

export interface RecipesResponse {
    success: boolean;
    data: {
        recipe: Recipe[];
        pagination: {
            page: number;
            size: number;
            total: number;
            totalPages: number;
        };
    };
    message?: string;
}

export const recipeApi = {
    getAllRecipes: async (page: number = 1, size: number = 10, searchTerm?: string): Promise<RecipesResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            ...(searchTerm && { searchTerm })
        });
        const response = await api.get<RecipesResponse>(API.RECIPES.GET_ALL(params.toString()));
        return response.data;
    },

    updateRecipe: async (id: string, recipeData: Partial<Recipe>): Promise<RecipeResponse> => {
        const response = await api.put<RecipeResponse>(API.RECIPES.UPDATE(id), recipeData);
        return response.data;
    },

    deleteRecipe: async (id: string): Promise<any> => {
        const response = await api.delete(API.RECIPES.DELETE(id));
        return response.data;
    },
};

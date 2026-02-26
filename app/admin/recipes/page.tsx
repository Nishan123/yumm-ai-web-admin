import { Metadata } from "next";
import { RecipeContainer } from "./_components/recipe-container";

export const metadata: Metadata = {
  title: "Manage Recipes | Yumm AI Admin",
  description: "Manage out application recipes from the admin panel",
};

export default function RecipesPage() {
  return <RecipeContainer />;
}

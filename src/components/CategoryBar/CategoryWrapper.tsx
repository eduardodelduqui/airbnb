import CategoryBar from "./CategoryBar";
import { Category } from "@/app/types/interfaces";

const getCategories = async (): Promise<Category[]> => {
  const response = await fetch("http://localhost:3000/api/categories", { cache: "no-store" });
  return response.json();
};

export default async function CategoryBarWrapper({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const categories = await getCategories();

  return <CategoryBar categories={categories} selectedCategory={selectedCategory} />;
}

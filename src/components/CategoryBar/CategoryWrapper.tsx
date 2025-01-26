import { ICategory } from "@/app/types/interfaces";
import CategoryBar from "./CategoryBar";

const getCategories = async (): Promise<ICategory[]> => {
  const response = await fetch("http://localhost:3000/api/categories");
  return response.json();
};

export default async function CategoryBarWrapper({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const categories = await getCategories();

  return (
    <CategoryBar categories={categories} selectedCategory={selectedCategory} />
  );
}

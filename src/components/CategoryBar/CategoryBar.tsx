'use client';

import { useRouter } from "next/navigation";
import { Category } from "@/app/types/interfaces";
import CategoryItem from "./CategoryItem";

type CategoryBarClientProps = {
  categories: Category[];
  selectedCategory: string;
};

export default function CategoryBarClient({ categories, selectedCategory }: CategoryBarClientProps) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/?category=${category}`);
  };

  return (
    <nav>
      <ul className="grid grid-flow-col px-6 gap-4 overflow-auto scrollbar-w-none">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col gap-1 justify-center items-center cursor-pointer relative ${
              selectedCategory === category.id ? "opacity-100 selected-category" : "opacity-60"
            }`}
          >
            <CategoryItem
              id={category.id}
              image={category.image}
              text={category.text}
              url={category.url}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

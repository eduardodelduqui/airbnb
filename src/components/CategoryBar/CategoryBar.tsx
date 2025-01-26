"use client";

import { ICategory } from "@/app/types/interfaces";
import { useRouter } from "next/navigation";
import styles from "./CategoryBar.module.css";

type CategoryBarClientProps = {
  categories: ICategory[];
  selectedCategory: string;
};

export default function CategoryBarClient({
  categories,
  selectedCategory,
}: CategoryBarClientProps) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/?category=${category}`);
  };

  const CategoryItem: React.FC<ICategory> = ({ image, text, url, id }) => {
    return (
      <div className={styles.categoryItem}>
        <img src={image} alt={text} className={styles.categoryItem__image} />
        <p className={styles.categoryItem__name}>{text}</p>
      </div>
    );
  };

  return (
    <nav>
      <ul className={styles.navBar}>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`${styles.navBar__item} ${
              selectedCategory === category.id
                ? styles.navBar__item__selected
                : ""
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

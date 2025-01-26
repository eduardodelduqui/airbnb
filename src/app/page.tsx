import CategoryBarWrapper from "@/components/CategoryBar/CategoryWrapper";
import FeedWrapper from "@/components/Feed/FeedWrapper";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || "chales";

  return (
    <main>
      <header className={styles.header}>
        <Header />
        <CategoryBarWrapper selectedCategory={selectedCategory} />
      </header>
      <div className={styles.feedContainer}>
        <FeedWrapper category={selectedCategory} />
      </div>
    </main>
  );
}

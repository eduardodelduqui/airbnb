import CategoryBarWrapper from "@/components/CategoryBar/CategoryWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import Header from "@/components/Header";

export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
  const params = await searchParams;
  const selectedCategory = params.category || "chales";

  return (
    <main>
      <header className="pt-3.5 mb-6 shadow-bottom">
        <Header/>
        <CategoryBarWrapper selectedCategory={selectedCategory} />
      </header>
      <div className="px-6 min-h-screen font-[family-name:var(--font-geist-sans)]">
        <FeedWrapper category={selectedCategory} />
      </div>
    </main>
  );
}

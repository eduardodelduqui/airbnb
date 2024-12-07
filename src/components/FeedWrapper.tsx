import Feed from "./Feed";

const getListings = async (category: string) => {
  const response = await fetch(`http://localhost:3000/api/listings?categoryId=${category}`, {
    cache: "no-store",
  });
  return response.json();
};

export default async function FeedWrapper({ category }: { category: string }) {
  const listings = await getListings(category);

  return <Feed listings={listings} />;
}

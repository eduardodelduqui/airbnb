import { IListing } from "@/app/types/interfaces";
import React from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";

interface FeedProps {
  listings: IListing[];
}

const Feed: React.FC<FeedProps> = async ({ listings }) => {
  return (
    <section className={styles.feed}>
      {listings.map((listing, index) => {
        return <Card key={index} listing={listing} />;
      })}
    </section>
  );
};

export default Feed;

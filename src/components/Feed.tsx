import React from 'react';
import Card from './card';
import { Listing } from '@/app/types/interfaces';

interface FeedProps {
  listings: Listing[]
}

const Feed: React.FC<FeedProps> = async ({ listings }) => {

  return (
    <section className="grid gap-10">
      {listings.map((listing, index) => {
        return (
          <Card
            key={index}
            listing={listing}
          />
        )
      })}

    </section>
  )
}

export default Feed;
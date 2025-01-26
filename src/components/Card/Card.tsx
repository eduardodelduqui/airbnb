import { IListing } from "@/app/types/interfaces";
import Link from "next/link";
import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./Card.module.css";

const SubTitle: React.FC<{ listing: IListing }> = ({ listing }) => {
  let subtitle: string;
  if (
    listing.category === "frente-praia" ||
    listing.category === "beira-do-lago"
  ) {
    subtitle = listing.district;
  } else if (listing.category === "vistas-incriveis") {
    subtitle = listing.subtitle;
  } else if (listing.category === "nas-alturas") {
    subtitle = `${listing.altitude} de altitude`;
  } else {
    subtitle = `${listing.distance} km de distância`;
  }

  return <p className={styles.subtitle}>{subtitle}</p>;
};

const FavoriteFlag: React.FC = () => {
  return (
    <div className={styles.favoriteFlag}>
      <img
        src="/icons/favorite.svg"
        alt="Favorite"
        className={styles.favoriteFlag_Image}
      />
    </div>
  );
};

const PopularFlag: React.FC<{ isPopular: boolean }> = ({ isPopular }) => {
  if (isPopular) {
    return (
      <div className={styles.popularFlag}>
        <div className={styles.popularFlag_Text}>
          <p>Preferido dos hóspedes</p>
        </div>
      </div>
    );
  }
  return null;
};

const InfoBox: React.FC<{ listing: IListing }> = ({ listing }) => {
  return (
    <div className={styles.infoBox}>
      <PopularFlag isPopular={listing.popular} />
      <FavoriteFlag />
    </div>
  );
};

const Card: React.FC<{ listing: IListing }> = ({ listing }) => {
  return (
    <Link href={`/rooms/${listing.id}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Carousel rounded={true} showPageNumber={false}>
            {listing.images.map((image, index) => (
              <img
                className={styles.carousel_image}
                key={index}
                src={image}
                alt=""
              />
            ))}
          </Carousel>
          <InfoBox listing={listing} />
        </div>
        <div className={styles.details}>
          <div className={styles.header}>
            <p className={styles.location}>
              {listing.city}, {listing.country}
            </p>
            <div className={styles.rating}>
              <img
                src="/icons/star-icon.svg"
                alt="Rating"
                className={styles.rating_icon}
              />
              <span>{listing.rating}</span>
            </div>
          </div>
          <SubTitle listing={listing} />
          <p className={styles.dateRange}>
            {listing.dayStart} - {listing.dayEnd} de {listing.month}.
          </p>
          <p className={styles.price}>
            <span className={styles.price_value}>{listing.price}</span>{" "}
            {listing.isNight ? "noite" : "dia"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

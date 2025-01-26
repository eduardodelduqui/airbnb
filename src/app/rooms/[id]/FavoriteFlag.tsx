import { IListing } from "@/app/types/interfaces";
import styles from "./FavoriteFlag.module.css";

const FavoriteFlag: React.FC<{ listing: IListing }> = ({ listing }) => {
  if (!listing.popular) {
    const reviewText = `${listing.reviews} comentários`;
    return (
      <div className={styles.reviewContainer}>
        <img
          src="/icons/star-icon.svg"
          alt="Rating"
          className={styles.starIcon}
        />
        <span className={styles.rating}>{listing.rating}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.reviewText}>{reviewText}</span>
      </div>
    );
  }

  return (
    <div className={styles.popularContainer}>
      <div className={styles.popularGrid}>
        <div className={styles.flagRating}>
          <div className={styles.ratingLarge}>{listing.rating}</div>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src="/icons/star-icon.svg"
                alt="Star"
                className={styles.starSmall}
              />
            ))}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.flagFavorite}>
          <div className={styles.favoriteContent}>
            <img
              src="/icons/leaf-left.svg"
              alt="Leaf Left"
              className={styles.leafIcon}
            />
            <div className={styles.favoriteText}>
              Preferido{"\n"}dos hóspedes
            </div>
            <img
              src="/icons/leaf-right.svg"
              alt="Leaf Right"
              className={styles.leafIcon}
            />
          </div>
          <div className={styles.additionalText}>
            Uma das acomodações no Airbnb que fazem mais sucesso com os hóspedes
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.flagReviews}>
          <div className={styles.ratingLarge}>{listing.reviews}</div>
          <span className={styles.reviewsUnderline}>avaliações</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteFlag;

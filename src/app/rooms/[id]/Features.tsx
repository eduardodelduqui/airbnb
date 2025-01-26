import { IListing } from "@/app/types/interfaces";
import styles from "./Features.module.css";

const translateDetails = (text: string): string => {
  const translations: Record<string, string> = {
    guests: "hóspedes",
    bedrooms: "quartos",
    beds: "camas",
    bathrooms: "banheiros",
    kitchen: "cozinha",
  };

  return translations[text];
};

const Features: React.FC<{ room: IListing }> = ({ room }) => {
  const { guests, bedrooms, beds, bathrooms } = room.details;
  const features = Object.entries({ guests, bedrooms, beds, bathrooms });

  return (
    <ul className={styles.featuresList}>
      {features.map((feature, index) => {
        const [key, value] = feature;
        if (!value) {
          return null;
        }

        const text = `${value} ${translateDetails(key)}`;
        if (index === 0) {
          return (
            <li className={styles.featureItem} key={index}>
              {text}
            </li>
          );
        }

        return (
          <li className={styles.featureItem} key={index}>
            <span className={styles.separator}>•</span>
            <span className={styles.featureText}>{text}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Features;

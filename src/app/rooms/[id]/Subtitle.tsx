import { IListing } from "@/app/types/interfaces";
import styles from "./Subtitle.module.css";

const SubTitle: React.FC<{ room: IListing }> = ({ room }) => {
  const prefix = room.allPlace ? "Espaço inteiro" : "Um quarto";
  const text = `${prefix} em ${room.city}, ${room.country}`;
  return <h2 className={styles.subTitle}>{text}</h2>;
};

export default SubTitle;

import { IGuestsNumber } from "@/app/types/interfaces";
import DateRangePicker from "@/components/DatePicker/DatePicker";
import styles from "./BookingBox.module.css";

const BookingBox: React.FC<{
  price: string;
  minimumRangeDays: number;
  maxNumberGuests: IGuestsNumber;
  minNumberGuests: IGuestsNumber;
}> = ({ price, minimumRangeDays, maxNumberGuests, minNumberGuests }) => {
  return (
    <div className={styles.bookingBox}>
      <p className={styles.priceRow}>
        <span className={styles.price}>{price}</span>{" "}
        <span className={styles.nightText}>noite</span>
      </p>
      <DateRangePicker
        minimumRange={minimumRangeDays}
        maxNumberGuests={maxNumberGuests}
        minNumberGuests={minNumberGuests}
        price={price}
      />
    </div>
  );
};

export default BookingBox;

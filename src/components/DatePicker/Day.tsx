import React from "react";
import styles from "./Day.module.css";

const Day: React.FC<{
  day: Date | null;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onClick: (day: Date) => void;
}> = ({ day, selectedStartDate, selectedEndDate, onClick }) => {
  if (!day) return <td className={styles.datepickerDay}></td>;

  const today = new Date();
  const isPast = day.getTime() < today.getTime();
  const isInRange =
    selectedStartDate &&
    selectedEndDate &&
    day.getTime() >= selectedStartDate.getTime() &&
    day.getTime() <= selectedEndDate.getTime();
  const isStart =
    selectedStartDate && day.getTime() === selectedStartDate.getTime();
  const isEnd = selectedEndDate && day.getTime() === selectedEndDate.getTime();

  const classes = [styles.datepickerDay];
  if (isPast) classes.push(styles.datepickerDayDisabled);
  if (isInRange) classes.push(styles.datepickerRangeDay);
  if (isStart) classes.push(styles.datepickerRangeDayStart);
  if (isEnd) classes.push(styles.datepickerRangeDayEnd);

  return (
    <td className={classes.join(" ")} onClick={() => !isPast && onClick(day)}>
      <div className={isStart || isEnd ? styles.datepickerSelectedDay : ""}>
        {day.getDate()}
      </div>
    </td>
  );
};

export default Day;

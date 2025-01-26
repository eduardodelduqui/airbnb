import React from "react";
import styles from "./DatePickerInput.module.css";

const DatePickerInput: React.FC<{
  value: string;
  label: string;
  onClick?: () => void;
}> = ({ value, label, onClick }) => (
  <div className={styles.container} onClick={onClick}>
    <label className={styles.label}>{label}</label>
    <input type="text" className={styles.input} readOnly value={value || ""} />
  </div>
);

export default DatePickerInput;

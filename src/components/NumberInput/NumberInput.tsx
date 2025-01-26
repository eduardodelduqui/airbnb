"use client";

import React from "react";
import styles from "./NumberInput.module.css";

interface InputButtonProps {
  disabled?: boolean | (() => boolean);
  onClick?: () => void;
  children: React.ReactNode;
}

interface NumberInputProps {
  value: number;
  maxValue?: number;
  minValue?: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  maxValue = 99,
  minValue = 0,
  onChange,
}) => {
  const increaseValue = (): void => {
    if (value < maxValue) {
      onChange(value + 1);
    }
  };

  const decreaseValue = (): void => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  const InputButton: React.FC<InputButtonProps> = ({
    disabled,
    onClick,
    children,
  }) => {
    const isDisabled = typeof disabled === "function" ? disabled() : disabled;

    return (
      <button
        className={`${styles.button} ${isDisabled ? styles.buttonDisabled : ""}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <InputButton onClick={decreaseValue} disabled={() => value <= minValue}>
        -
      </InputButton>
      <div className={styles.value}>{value}</div>
      <InputButton onClick={increaseValue} disabled={() => value >= maxValue}>
        +
      </InputButton>
    </div>
  );
};

export default NumberInput;

"use client";

import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { IGuestsNumber } from "@/app/types/interfaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import NumberInput from "../NumberInput/NumberInput";
import Calendar from "./Calendar";
import styles from "./DatePicker.module.css";
import DatePickerInput from "./DatePickerInput";
import {
  calculateNumberOfNights,
  formatDate,
  multiplyPrice,
  sumPrice,
} from "./utils";

interface IGuestCategory {
  name: string;
  field: keyof IGuestsNumber;
  description?: string;
}

const guestCategories: IGuestCategory[] = [
  {
    name: "Adultos",
    field: "adults",
    description: "Com 13 anos ou mais",
  },
  {
    name: "Crianças",
    field: "childs",
    description: "De 2 a 12 anos",
  },
  {
    name: "Bebês",
    field: "infants",
    description: "Menor de 2 anos",
  },
  {
    name: "Animais de estimação",
    field: "pets",
  },
];

const DateRangePicker: React.FC<{
  minimumRange?: number;
  maxNumberGuests: IGuestsNumber;
  minNumberGuests: IGuestsNumber;
  price: string;
}> = ({ minimumRange, maxNumberGuests, minNumberGuests, price }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [totalTaxes, setTotalTaxes] = useState<string>("");
  const [totalPriceWithTaxes, setTotalPriceWithTaxes] = useState<string>("");
  const [totalNights, setTotalNights] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    childs: 0,
    infants: 0,
    pets: 0,
  });

  useEffect(() => {
    if (startDate && endDate) {
      const nights = calculateNumberOfNights(startDate, endDate);
      setTotalPrice(multiplyPrice(price, nights));
      setTotalNights(nights);
    }
  }, [startDate, endDate, price]);

  useEffect(() => {
    setTotalTaxes(multiplyPrice(totalPrice, 0.15));
    setTotalPriceWithTaxes(
      sumPrice(multiplyPrice(totalPrice, 0.15), totalPrice)
    );
  }, [totalPrice]);

  const comboBoxRef = useRef<HTMLDivElement>(null);
  const bookingCalendar = useRef<HTMLDivElement>(null);

  useOnClickOutside(comboBoxRef, () => setIsOpen(false));
  useOnClickOutside(bookingCalendar, () => setIsDatePickerOpen(false));

  const GuestSelector = () => {
    return guestCategories.map((category, index) => (
      <div key={index} className={styles.guestRow}>
        <div>
          <div className={styles.guestName}>{category.name}</div>
          <div className={styles.guestDescription}>{category.description}</div>
        </div>
        <div className={styles.guestInput}>
          <NumberInput
            value={guests[category.field]}
            maxValue={maxNumberGuests[category.field]}
            minValue={minNumberGuests[category.field]}
            onChange={(value) =>
              setGuests((prevGuests) => ({
                ...prevGuests,
                [category.field]: value,
              }))
            }
          />
        </div>
      </div>
    ));
  };

  const ComboBox = () => {
    if (isOpen) {
      return (
        <div ref={comboBoxRef} className={styles.comboBox}>
          <GuestSelector />
        </div>
      );
    }
    return null;
  };

  const BookingCalendar = useMemo(() => {
    if (!isDatePickerOpen) return null;

    return (
      <div ref={bookingCalendar} className={styles.calendarWrapper}>
        <div className={styles.calendarHeader}>
          <div>
            <h3>
              {startDate && endDate
                ? `${calculateNumberOfNights(startDate, endDate)} noites`
                : "Selecionar datas"}
            </h3>
            <p>
              {startDate && endDate
                ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                : `Estadia mínima: ${minimumRange} noites`}
            </p>
          </div>
          <div className={styles.datePickerInput}>
            <DatePickerInput
              label="CHECK-IN"
              value={startDate ? startDate.toLocaleDateString() : ""}
            />
            <DatePickerInput
              label="CHECKOUT"
              value={endDate ? endDate.toLocaleDateString() : ""}
            />
          </div>
        </div>
        <Calendar
          defaultStartDay={startDate}
          defaultEndDay={endDate}
          minimumRange={minimumRange}
          onSelectStartDay={setStartDate}
          onSelectEndDay={setEndDate}
        />
      </div>
    );
  }, [isDatePickerOpen, startDate, endDate, minimumRange]);

  return (
    <div>
      <div className={`${styles.borderContainer} ${styles.borderContainerTop}`}>
        {BookingCalendar}
        <DatePickerInput
          label="CHECK-IN"
          value={startDate ? startDate.toLocaleDateString() : ""}
          onClick={() => setIsDatePickerOpen(true)}
        />
        <DatePickerInput
          label="CHECKOUT"
          value={endDate ? endDate.toLocaleDateString() : ""}
          onClick={() => setIsDatePickerOpen(true)}
        />
      </div>
      <div
        className={`${styles.borderContainer} ${styles.borderContainerBottom}`}
      >
        <div className={styles.guestSelector}>
          <label className={styles.label}>HÓSPEDES</label>
          <div className={styles.guestDetails} onClick={() => setIsOpen(true)}>
            <span>
              {guests.adults + guests.childs}{" "}
              {guests.adults + guests.childs === 1 ? "hóspede" : "hóspedes"}
            </span>
            {guests.infants > 0 && (
              <>
                <pre>, </pre>
                <span>
                  {guests.infants} {guests.infants === 1 ? "bebê" : "bebês"}
                </span>
              </>
            )}
            {guests.pets > 0 && (
              <>
                <pre>, </pre>
                <span>
                  {guests.pets}{" "}
                  {guests.pets === 1
                    ? "animal de estimação"
                    : "animais de estimação"}
                </span>
              </>
            )}
          </div>
        </div>
        <ComboBox />
      </div>
      <button className={styles.reservationButton}>Reservar</button>
      <p className={styles.disclaimer}>Você ainda não será cobrado</p>
      {totalNights > 0 && (
        <div>
          <div className={styles.totalValues}>
            <div className={styles.priceDescription}>
              {price} x {totalNights} noites
            </div>
            <div className={styles.priceText}>{totalPrice}</div>
          </div>
          <div className={styles.totalValues}>
            <div className={styles.priceDescription}>
              Taxa de serviço do Airbnb
            </div>
            <div className={styles.priceText}> {totalTaxes} </div>
          </div>
          <div className={styles.totalValues}>
            <div className={styles.priceDescription}>Total sem impostos</div>
            <div className={styles.priceText}> {totalPriceWithTaxes} </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

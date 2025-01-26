"use client";

import React, { useState } from "react";
import styles from "./Calendar.module.css";
import Day from "./Day";

const monthList = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const generateCalendar = (month: number, year: number) => {
  const daysInMonth = getDaysInMonth(month, year);
  const startDay = new Date(year, month, 1).getDay();
  const calendar = [];
  let week = Array(7).fill(null);
  let day = 1;

  for (let i = startDay; i < 7; i++) {
    week[i] = new Date(year, month, day++);
  }

  calendar.push(week);

  while (day <= daysInMonth) {
    week = Array(7).fill(null);
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      week[i] = new Date(year, month, day++);
    }
    calendar.push(week);
  }

  return calendar;
};

const WeekDay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <th className={styles.weekDay}>{children}</th>;
};

const Calendar: React.FC<{
  defaultStartDay?: Date | null;
  defaultEndDay?: Date | null;
  minimumRange?: number;
  onSelectStartDay: (day: Date | null) => void;
  onSelectEndDay: (day: Date | null) => void;
}> = ({
  defaultStartDay = null,
  defaultEndDay = null,
  minimumRange = 0,
  onSelectStartDay,
  onSelectEndDay,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    defaultStartDay
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    defaultEndDay
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleSelectDay = (day: Date) => {
    const today = new Date();
    if (day.getTime() <= today.getTime()) return;

    if (!selectedStartDate) {
      setSelectedStartDate(day);
      onSelectStartDay(day);
    } else if (selectedStartDate && !selectedEndDate) {
      if (day.getTime() < selectedStartDate.getTime()) {
        setSelectedStartDate(day);
        onSelectStartDay(day);
      } else {
        setSelectedEndDate(day);
        onSelectEndDay(day);
      }
    } else if (selectedStartDate && selectedEndDate) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
      onSelectStartDay(day);
      onSelectEndDay(null);
    }
  };

  const handleChangeNextMonth = () => {
    setCurrentMonth((currentMonth + 1) % 12);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
  };

  const handleChangePrevMonth = () => {
    setCurrentMonth((currentMonth - 1 + 12) % 12);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
  };

  return (
    <div className={styles.container}>
      <div className={styles.monthWrapper}>
        {[0, 1].map((offset) => {
          const month = (currentMonth + offset) % 12;
          const year =
            currentMonth + offset > 11 ? currentYear + 1 : currentYear;

          return (
            <div key={offset} className={styles.month}>
              <div className={styles.monthTitle}>
                {monthList[month]} de {year}
              </div>
              <table>
                <thead>
                  <tr>
                    <WeekDay>Dom</WeekDay>
                    <WeekDay>Seg</WeekDay>
                    <WeekDay>Ter</WeekDay>
                    <WeekDay>Qua</WeekDay>
                    <WeekDay>Qui</WeekDay>
                    <WeekDay>Sex</WeekDay>
                    <WeekDay>Sáb</WeekDay>
                  </tr>
                </thead>
                <tbody>
                  {generateCalendar(month, year).map((week, index) => (
                    <tr key={index}>
                      {week.map((day: Date, i) => (
                        <Day
                          key={i}
                          day={day}
                          selectedStartDate={selectedStartDate}
                          selectedEndDate={selectedEndDate}
                          onClick={handleSelectDay}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.navigationButton} ${styles.nextButton}`}
        onClick={handleChangeNextMonth}
      >
        <img
          src="/icons/arrow-next.svg"
          alt="Next"
          className={styles.arrowIcon}
        />
      </div>
      <div
        className={`${styles.navigationButton} ${styles.prevButton}`}
        onClick={handleChangePrevMonth}
      >
        <img
          src="/icons/arrow-prev.svg"
          alt="Previous"
          className={styles.arrowIcon}
        />
      </div>
    </div>
  );
};

export default Calendar;

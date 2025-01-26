"use client";

import translations from "@/app/utils/translations";
import React, { useState } from "react";
import styles from "./Amenities.module.css";

const translateAmenity = (key: string): string => {
  return translations[key] || key;
};

const AmenitiesSection: React.FC<{
  sectionName: string;
  amenities: string[];
}> = ({ sectionName, amenities }) => {
  const translatedSectionName = translateAmenity(sectionName);

  return (
    <section className={styles.section}>
      <div className={styles.section_title}>{translatedSectionName}</div>
      {amenities.map((amenity, index) => {
        const translatedAmenity = translateAmenity(amenity);
        const iconPath = `/icons/amenities/${amenity}.svg`;

        return (
          <div key={index} className={styles.item}>
            {iconPath && (
              <img
                src={iconPath}
                alt={amenity}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
            )}
            <span>{translatedAmenity}</span>
          </div>
        );
      })}
    </section>
  );
};

const AmenitiesDetails: React.FC<{ amenities: Record<string, string[]> }> = ({
  amenities,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const allSections = Object.keys(amenities);
  const allItems = allSections.map((section) => amenities[section]).flat();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>O que esse lugar oferece</h2>
      <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
        {Object.keys(amenities).map((section, index) => {
          if (!isOpen && index >= 1) {
            return;
          }

          return (
            <AmenitiesSection
              key={index}
              sectionName={section}
              amenities={amenities[section]}
            />
          );
        })}
      </div>
      {!isOpen && (
        <button className={styles.expandButton} onClick={() => setIsOpen(true)}>
          Mostrar todas as {allItems.length} comodidades
        </button>
      )}

      {isOpen && (
        <button
          className={styles.expandButton}
          onClick={() => setIsOpen(false)}
        >
          Mostrar menos
        </button>
      )}
    </div>
  );
};

export default AmenitiesDetails;

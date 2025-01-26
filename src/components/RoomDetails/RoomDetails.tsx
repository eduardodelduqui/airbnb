"use client";

import useWindowWidth from "@/app/hooks/useWindowWidth";
import { IListing } from "@/app/types/interfaces";
import { useState } from "react";
import styles from "./RoomDetails.module.css";

const RoomDetails: React.FC<{ room: IListing }> = ({ room }) => {
  const [openDescription, setDescription] = useState(false);
  const width = useWindowWidth();

  const RoomDetailsButtonText = () => {
    if (openDescription) {
      return <span>Mostrar menos &#x2934;</span>;
    }

    return <span>Mostrar mais &#10549;</span>;
  };

  return (
    <>
      <section className={styles.section}>
        <div className={openDescription ? "" : styles["ellipsed-text"]}>
          {room.description}
        </div>
        {width <= 540 && (
          <button
            className={styles.button}
            onClick={() => setDescription(!openDescription)}
          >
            <RoomDetailsButtonText />
          </button>
        )}
      </section>
    </>
  );
};

export default RoomDetails;

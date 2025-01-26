import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div id="header">
      <Link href={"/"}>
        <div className={styles.logo}></div>
      </Link>
      <div className={styles.searchBox}>
        <img
          src="/icons/search-icon.svg"
          alt="Airbnb Pixel"
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Para onde?"
        />
      </div>
      <button className={styles.filterButton}>
        <img
          src="/icons/filter-icon.svg"
          alt="Menu"
          className={styles.filterIcon}
        />
      </button>
    </div>
  );
};

export default Header;

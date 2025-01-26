"use client";

import React, { ReactElement, useState } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carousel.module.css";

type CarouselProps = {
  children: ReactElement[];
  autoPlay?: boolean;
  showArrows?: boolean;
  showThumbs?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  showPageNumber?: boolean;
  rounded?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  showArrows = true,
  showThumbs = false,
  showStatus = false,
  showIndicators = true,
  showPageNumber = true,
  rounded = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean) =>
    hasPrev && (
      <div
        onClick={(event) => {
          event.preventDefault();
          clickHandler();
        }}
        className={`${styles.arrow} ${styles.arrow_prev}`}
      >
        <img
          src="/icons/arrow-prev.svg"
          alt="Previous"
          className={styles.arrow_icon}
        />
      </div>
    );

  const renderArrowNext = (clickHandler: () => void, hasNext: boolean) =>
    hasNext && (
      <div
        onClick={(event) => {
          event.preventDefault();
          clickHandler();
        }}
        className={`${styles.arrow} ${styles.arrow_next}`}
      >
        <img
          src="/icons/arrow-next.svg"
          alt="Next"
          className={styles.arrow_icon}
        />
      </div>
    );

  const PageNumber: React.FC<{ showPageNumber: boolean }> = ({
    showPageNumber,
  }) => {
    if (showPageNumber) {
      return (
        <div className={styles.pageNumber}>
          {`${currentIndex + 1}/${children.length}`}
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <ResponsiveCarousel
        autoPlay={autoPlay}
        showArrows={true}
        showThumbs={showThumbs}
        showStatus={showStatus}
        infiniteLoop={false}
        selectedItem={currentIndex}
        onChange={handleSlideChange}
        showIndicators={showIndicators}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        swipeScrollTolerance={50}
        swipeable={true}
        preventMovementUntilSwipeScrollTolerance={true}
        className={rounded ? styles.layout_rounded : styles.layout}
      >
        {children}
      </ResponsiveCarousel>
      <PageNumber showPageNumber={showPageNumber} />
    </div>
  );
};

export default Carousel;

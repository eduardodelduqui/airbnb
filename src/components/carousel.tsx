'use client'

import React, { ReactElement, useState } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselProps = {
  children: ReactElement[];
  autoPlay?: boolean;
  showArrows?: boolean;
  showThumbs?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  rounded?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  showArrows = true,
  showThumbs = false,
  showStatus = false,
  showIndicators = true,
  rounded = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean) =>
    hasPrev && (
      <div
        onClick={clickHandler}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
      >
        <img src="/icons/arrow-prev.svg" alt="Previous" className="w-4 h-4" />
      </div>
    );

  const renderArrowNext = (clickHandler: () => void, hasNext: boolean) =>
    hasNext && (
      <div
        onClick={clickHandler}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
      >
        <img src="/icons/arrow-next.svg" alt="Next" className="w-4 h-4" />
      </div>
    );

  return (
    <div className="w-full relative">
      <ResponsiveCarousel
        autoPlay={autoPlay}
        showArrows={showArrows}
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
        className={rounded ? "rounded-xl overflow-hidden" : "overflow-hidden"}
      >
        {children}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;

import React from "react";
import styles from "./ImageGrid.module.css";

const ImageGrid: React.FC<{ images: string[]; minHeight?: number }> = ({
  images,
  minHeight = 400,
}) => {
  const selectedImages = images.slice(0, 5);

  return (
    <div className={styles.container} style={{ minHeight }}>
      {selectedImages.map((url, index) => (
        <img
          key={index}
          src={url}
          alt="image"
          style={{
            gridArea: `image-${index}`,
            height: "100%",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
          className={`image-${index}`}
        />
      ))}
    </div>
  );
};

export default ImageGrid;

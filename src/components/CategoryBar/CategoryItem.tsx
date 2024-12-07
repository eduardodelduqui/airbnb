import React from 'react';
import { Category } from '@/app/types/interfaces';

type CategoryItemProps = Category

const CategoryItem: React.FC<CategoryItemProps> = ({ image, text, url, id }) => {
  return (
    <div
      className="flex flex-col gap-1 justify-center items-center my-4 opacity-60 cursor-pointer"
    >
      <img src={image} alt={text} className="w-6 h-6" />
      <p className="text-xs font-semibold w-max">{text}</p>
    </div>
  );
};

export default CategoryItem;

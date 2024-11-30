import { Category } from '@/entities/Category';
import React from 'react';

type Props = {
  category: Category;
};

export const CategoryIcon: React.FC<Props> = ({ category }) => {
  return <div>{category.name}</div>;
};

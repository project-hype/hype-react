import React from 'react';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';
import { ButtonGroup } from './MemberStyledComponents';

const CategoryButtonGroup = ({ selectedCategories = [], handleCategoryClick }) => (
  <ButtonGroup>
    {categories.map((category) => (
      <CategoryButton
        key={category.id}
        selected={selectedCategories.includes(category.id)}
        onClick={() => handleCategoryClick(category.id)}
      >
        {category.label}
      </CategoryButton>
    ))}
  </ButtonGroup>
);

const categories = [
  { id: 1, label: '브랜드' },
  { id: 2, label: '패션/뷰티' },
  { id: 3, label: '식품/요리' },
  { id: 4, label: '리빙' },
  { id: 5, label: '헬스/스포츠' },
  { id: 6, label: '소품/굿즈' },
  { id: 7, label: '스피치/리스닝' },
  { id: 8, label: '취미' },
  { id: 9, label: '공연/이벤트' },
  { id: 10, label: '유아' },
];

export default CategoryButtonGroup;

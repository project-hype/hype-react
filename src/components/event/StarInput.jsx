import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 3rem;
  color: ${({ isSelected }) => (isSelected ? 'orange' : 'lightgray')};

  ${({ isHalf }) =>
    isHalf &&
    css`
      position: absolute;
      width: 24px;
      overflow: hidden;

      &:nth-of-type(10) {
        transform: translate(-216px);
      }
      &:nth-of-type(8) {
        transform: translate(-168px);
      }
      &:nth-of-type(6) {
        transform: translate(-120px);
      }
      &:nth-of-type(4) {
        transform: translate(-72px);
      }
      &:nth-of-type(2) {
        transform: translate(-24px);
      }
    `}
`;

const StarInput = ({ onClickRating, value, isHalf, selectedRating, isZero }) => {
  const handleClickRatingInput = () => {
    const newValue = value === selectedRating ? 0 : value;
    onClickRating(newValue);
  };

  return (
    <>
      <Input type="radio" name="rating" id={`star${value}`} value={value} />
      <Label
        onClick={handleClickRatingInput}
        isHalf={isHalf}
        htmlFor={`star${value}`}
        isSelected={selectedRating >= value}
      >
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </Label>
    </>
  );
};

export default StarInput;

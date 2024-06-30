import styled from '@emotion/styled';
import { useState } from 'react';
import StarInput from './StarInput';

/**
 * 별점 계산 컴포넌트
 * @author 정은지
 * @since 2024.06.21
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.21  	정은지        최초 생성
 * </pre>
 */

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  label:hover,
  label:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClickRating = (value) => {
    setRating(value);
  };

  return (
    <Base>
      <Name>별점</Name>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={4.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={3.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={2.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={1.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} />
      </RatingField>
      <RatingValue>{rating}</RatingValue>
    </Base>
  );
};

export default StarRating;

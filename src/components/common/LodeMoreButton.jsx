import styled from 'styled-components';
import Rectangle200 from '../../assets/img/common/Rectangle200.png';

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledButton = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 15px;
  background-image: url(${Rectangle200});
  background-size: 100% 100%;
  height: 34px;
  width: 122px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LoadMoreButton = ({ onClick }) => {
  return (
    <Wrapper>
      <StyledButton onClick={onClick}>더보기</StyledButton>
    </Wrapper>
  );
};

export default LoadMoreButton;

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.div`
  align-items: flex-start;
  border-color: var(--popplycokrboulder);
  border-right-style: solid;
  border-right-width: 1px;
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding: 56px 0px;
  position: relative;
  width: 190px;

  & .div {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }

  & .text-wrapper {
    color: #000000;
    font-family: 'Happiness Sans-Title', Helvetica;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    width: fit-content;
  }

  & .text-wrapper-2 {
    color: #000000;
    font-family: 'Happiness Sans-Regular', Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    width: fit-content;
  }
`;

export const AdminLeftMenu = () => {
  return (
    <StyledMenu>
      <div className="div">
        <div className="text-wrapper">행사 관리</div>
      </div>
      <div className="div">
        <div className="text-wrapper">배너 관리</div>
      </div>
      <div className="div">
        <div className="text-wrapper">통계 보기</div>
        <div className="text-wrapper-2">즐겨찾기</div>
        <div className="text-wrapper-2">별점</div>
      </div>
    </StyledMenu>
  );
};

export default AdminLeftMenu;

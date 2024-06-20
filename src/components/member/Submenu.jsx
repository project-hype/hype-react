import React from 'react';
import styled from 'styled-components';

const TextWrapper = styled.div``;

const StyledMenu = styled.div`
  height: 180px; /* 메뉴 전체 높이 */
  width: 100%; /* 메뉴 전체 폭 */
  display: flex;
  padding: 72px;
  justify-content: space-around; /* 요소들 사이의 공간을 균등하게 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  box-sizing: border-box; /* padding이 요소의 크기에 포함되도록 설정 */
`;

const MenuItemWrapper = styled.div`
  flex: 1; /* 동일한 너비로 자동 조정 */
  display: flex;
  justify-content: center; /* 내부 텍스트 가로 중앙 정렬 */
  align-items: center; /* 내부 텍스트 세로 중앙 정렬 */
  position: relative; /* TextWrapperStyled의 z-index 설정을 위해 필요 */
`;

const TextWrapperStyled = styled.div`
  font-family: '해피니스 산스 타이틀';
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s ease;
  color: ${(props) => (props.active ? '#ff8c00' : '#595959')};
  position: relative; /* z-index 설정을 위해 필요 */
  z-index: 1; /* TextWrapperStyled가 Separator 위로 올라오도록 설정 */
  margin-bottom: 10px; /* TextWrapperStyled와 Separator 사이의 간격 설정 */
`;

const Separator = styled.div`
  height: 5px; /* 구분선 높이 */
  background-color: ${(props) => (props.active ? '#ff8c00' : '#dcdcdc')};
  width: 100%; /* 구분선 폭을 메뉴 전체 너비에 맞춤 */
  position: absolute; /* 부모 요소인 MenuItemWrapper를 기준으로 위치 설정 */
  bottom: 0; /* 아래쪽에 배치 */
  left: 0; /* 좌측에 배치 */
  z-index: -1; /* TextWrapperStyled보다 아래에 위치하도록 설정 */
`;

const SubMenu = ({ activeTab, onTabChange }) => {
  const handleTabClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <StyledMenu>
      <MenuItemWrapper>
        <TextWrapperStyled active={activeTab === 'myInfo'} onClick={() => handleTabClick('myInfo')}>
          내 정보
        </TextWrapperStyled>
        <Separator className="separator-myInfo" active={activeTab === 'myInfo'} />
      </MenuItemWrapper>
      <MenuItemWrapper>
        <TextWrapperStyled active={activeTab === 'favorites'} onClick={() => handleTabClick('favorites')}>
          즐겨찾기
        </TextWrapperStyled>
        <Separator className="separator-favorites" active={activeTab === 'favorites'} />
      </MenuItemWrapper>
    </StyledMenu>
  );
};

export default SubMenu;

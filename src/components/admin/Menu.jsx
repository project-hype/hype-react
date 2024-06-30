import React from 'react';
import styled from 'styled-components';

/**
 * 관리자 페이지 - 네비게이션 바
 * @author 조영욱
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	조영욱        최초 생성
 * 2024.06.23   임원정        Admin 페이지 디자인수정
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const Menu = (props) => {
  return (
    <MenuWrapper>
      <MenuItem onClick={() => props.setActiveMenu('event')}>
        <TextWrapper>행사 관리</TextWrapper>
      </MenuItem>
      <MenuItem onClick={() => props.setActiveMenu('banner')}>
        <TextWrapper>배너 관리</TextWrapper>
      </MenuItem>
      <MenuItem onClick={() => props.setActiveMenu('category')}>
        <TextWrapper>카테고리 관리</TextWrapper>
      </MenuItem>
      <MenuItem onClick={() => props.setActiveMenu('hashtag')}>
        <TextWrapper>해시태그 관리</TextWrapper>
      </MenuItem>
      {/* <MenuItem>
        <TextWrapper>통계 보기</TextWrapper>
        <TextWrapper2>즐겨찾기</TextWrapper2>
        <TextWrapper2>별점</TextWrapper2>
      </MenuItem> */}
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding: 56px 0px;
  position: relative;
  width: 190px;
  border-right: 1px solid #dcdcdc;
  height: fit-container;
`;

const MenuItem = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  cursor: pointer; /* Add pointer cursor for better UX */
`;

const TextWrapper = styled.div`
  color: #000000;
  font-family: '해피니스 산스 타이틀', Helvetica;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
  &:hover {
    color: #ff8c00;
  }
`;

const TextWrapper2 = styled.div`
  color: #000000;
  font-family: '해피니스 산스 레귤러', Helvetica;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
`;

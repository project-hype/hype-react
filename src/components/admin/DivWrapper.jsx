import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Menu from './Menu';
import EventTable from './manageEvent/EventTable';
import BannerTable from './manageBanner/BannerTable';
import CategoryTable from './manageCategory/CategoryTable';
import HashtagTable from './manageHashtag/HashtagTable';

/**
 * 관리자 페이지 - 테이블 래퍼
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
const DivWrapper = () => {
  const [activeMenu, setActiveMenu] = useState('event');

  return (
    <Wrapper>
      <InnerDiv>
        <Body>
          <Menu setActiveMenu={setActiveMenu} />
          {activeMenu === 'event' && <EventTable />}
          {activeMenu === 'banner' && <BannerTable />}
          {activeMenu === 'category' && <CategoryTable />}
          {activeMenu === 'hashtag' && <HashtagTable />}
        </Body>
        <Nav />
      </InnerDiv>
    </Wrapper>
  );
};

export default DivWrapper;

const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const InnerDiv = styled.div`
  background-color: #ffffff;
  position: relative;
  width: 100%;
`;

const Body = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 128px;
  height: fit-container;
  left: 0;
  padding: 0px 72px;
  position: absolute;
  top: 113px;
  width: 100%;
`;

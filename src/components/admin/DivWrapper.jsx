import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Menu from './Menu';
import EventTable from './EventTable';
import BannerTable from './BannerTable';
import CategoryTable from './CategoryTable';
import HashtagTable from './HashtagTable';

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

const DivWrapper = () => {
  const [activeMenu, setActiveMenu] = useState('event'); // Default to 'event' article

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

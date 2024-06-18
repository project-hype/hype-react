import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Menu from './Menu';
import EventTable from './EventTable';
import BannerTable from './BannerTable';

const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const InnerDiv = styled.div`
  background-color: #ffffff;
  height: 1024px;
  position: relative;
  width: 100%;
`;

const Body = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 72px;
  height: 879px;
  left: 0;
  padding: 0px 72px;
  position: absolute;
  top: 113px;
  width: 1440px;
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
        </Body>
        <Nav />
      </InnerDiv>
    </Wrapper>
  );
};

export default DivWrapper;

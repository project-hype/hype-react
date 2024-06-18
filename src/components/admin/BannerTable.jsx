import React from 'react';
import styled from 'styled-components';
import Rectangle200 from '../../assets/img/common/Rectangle200.png';

const BannerWrapper = styled.div`
  align-self: stretch;
  flex: 1;
  flex-grow: 1;
  position: relative;
`;

const Header = styled.header`
  align-self: stretch;
  background-color: transparent;
  height: 49px;
  position: relative;
  width: 100%;
`;

const Row = styled.div`
  align-items: flex-start;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--collection-1-HD-dark-gray);
  display: flex;
  left: -1px;
  position: relative;
  top: -1px;
  width: 1036px;
`;

const Cell = styled.div`
  background-color: var(--wwwehyundaicomaqua-haze);
  height: 49px;
  position: relative;
  width: ${(props) => props.width || '95px'};
  border-left-style: ${(props) => (props.hasBorder ? 'solid' : 'none')};
  border-left-width: ${(props) => (props.hasBorder ? '1px' : '0')};
  border-color: var(--wwwehyundaicomnero);
`;

const TextWrapper = styled.div`
  color: var(--wwwehyundaicomwoodsmoke);
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  height: 21px;
  left: ${(props) => props.left || '22px'};
  letter-spacing: -0.25px;
  line-height: 21px;
  position: absolute;
  text-align: center;
  top: 13px;
  white-space: nowrap;
`;

const BannerTable = () => {
  return (
    <BannerWrapper>
      <TextWrapper style={{ fontSize: '30px', height: '38px', top: '55px' }}>배너 관리</TextWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '562px',
          position: 'absolute',
          top: '118px',
          width: '1034px',
        }}
      >
        <Header>
          <Row>
            <Cell>
              <TextWrapper left="22px">행사번호</TextWrapper>
            </Cell>
            <Cell width="416px" hasBorder>
              <TextWrapper left="195px">행사 제목</TextWrapper>
            </Cell>
            <Cell width="164px" hasBorder>
              <TextWrapper left="62px">배너 순서</TextWrapper>
            </Cell>
          </Row>
        </Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', height: '499px', width: '100%' }}>
          {/* Render rows similarly */}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '711px', left: '438px', width: '122px', height: '32px' }}>
        <div
          style={{
            backgroundImage: `url(${Rectangle200})`,
            backgroundSize: '100% 100%',
            height: '34px',
            position: 'relative',
            top: '-1px',
          }}
        >
          <TextWrapper style={{ fontSize: '14px', height: '14px', left: '43px', top: '10px' }}>더보기</TextWrapper>
        </div>
      </div>
    </BannerWrapper>
  );
};

export default BannerTable;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const EventWrapper = styled.div`
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

const CellHeader = styled.div`
  background-color: #f0f5f4;
  height: 49px;
  position: relative;
  width: ${(props) => props.width || '95px'};
  border-left-style: ${(props) => (props.hasBorder ? 'solid' : 'none')};
  border-left-width: ${(props) => (props.hasBorder ? '1px' : '0')};
`;

const Cell = styled.div`
  height: 49px;
  position: relative;
  width: ${(props) => props.width || '95px'};
  border-left-style: ${(props) => (props.hasBorder ? 'solid' : 'none')};
  border-left-width: ${(props) => (props.hasBorder ? '1px' : '0')};
`;

const TextWrapper = styled.div`
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

const EventTable = () => {
  // Dummy data
  const eventData = [
    { id: 10, typeName: '팝업', title: '어쩌고저쩌고', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 9, typeName: '전시', title: '전시명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 8, typeName: '공연', title: '공연명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 7, typeName: '강좌', title: '강좌명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 6, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 5, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 4, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 3, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 2, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
    { id: 1, typeName: '팝업', title: '팝업명', startDate: '2024.06.18', endDate: '2024.06.30' },
  ];

  const [eventData2, setEventData] = useState([]);

  useEffect(() => {
    // Axios를 이용한 데이터 요청
    axios
      .get('http://localhost:8080/admin/event/list')
      .then((response) => {
        // 데이터를 성공적으로 받아왔을 때
        console.log(response.data); // 받아온 데이터 확인 (개발 중에 유용함)
        setEventData(response.data); // 받아온 데이터를 상태에 저장
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error fetching event data:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  return (
    <EventWrapper>
      <TextWrapper style={{ fontSize: '30px', height: '38px', top: '55px' }}>행사 관리</TextWrapper>
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
            <CellHeader>
              <TextWrapper left="22px">행사번호</TextWrapper>
            </CellHeader>
            <CellHeader width="195px" hasBorder>
              <TextWrapper left="71px">행사 타입</TextWrapper>
            </CellHeader>
            <CellHeader width="416px" hasBorder>
              <TextWrapper left="195px">제목</TextWrapper>
            </CellHeader>
            <CellHeader width="164px" hasBorder>
              <TextWrapper left="62px">시작일</TextWrapper>
            </CellHeader>
            <CellHeader width="164px" hasBorder>
              <TextWrapper left="62px">종료일</TextWrapper>
            </CellHeader>
          </Row>
        </Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', height: '499px', width: '100%' }}>
          {eventData.map((event) => (
            <Row key={event.id}>
              <Cell>
                <TextWrapper left="22px">{event.id}</TextWrapper>
              </Cell>
              <Cell width="195px" hasBorder>
                <TextWrapper left="71px">{event.typeName}</TextWrapper>
              </Cell>
              <Cell width="416px" hasBorder>
                <TextWrapper left="195px">{event.title}</TextWrapper>
              </Cell>
              <Cell width="164px" hasBorder>
                <TextWrapper left="62px">{event.startDate}</TextWrapper>
              </Cell>
              <Cell width="164px" hasBorder>
                <TextWrapper left="62px">{event.endDate}</TextWrapper>
              </Cell>
            </Row>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '711px', left: '438px', width: '122px', height: '32px' }}>
        <div
          style={{
            backgroundImage: 'url(./rectangle-200.png)',
            backgroundSize: '100% 100%',
            height: '34px',
            position: 'relative',
            top: '-1px',
          }}
        >
          <TextWrapper style={{ fontSize: '14px', height: '14px', left: '43px', top: '10px' }}>더보기</TextWrapper>
        </div>
      </div>
    </EventWrapper>
  );
};

export default EventTable;

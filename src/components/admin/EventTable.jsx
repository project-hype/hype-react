import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EventRow from './EventRow';
import EventModal from './EventModal';
import Rectangle200 from '../../assets/img/common/Rectangle200.png';

// Styled Components
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #f0f5f4;
  width: 1036px;
`;

const RowContainer = styled.div`
  width: 1036px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Gray border color */
  height: 49px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')}; /* Gray border color */
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

const LoadMoreContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoadMoreButton = styled.div`
  background-image: url(${Rectangle200});
  background-size: 100% 100%;
  height: 34px;
  width: 122px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Component
const EventTable = () => {
  const [eventData, setEventData] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태 변수
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchData(page); // 페이지가 변경될 때마다 데이터 가져오기
  }, [page]); // page 상태 변수가 변경될 때마다 실행

  const fetchData = (pageNum) => {
    axios
      .get(`http://localhost:8080/admin/event/list?page=${pageNum}&amount=10`)
      .then((response) => {
        // 데이터를 성공적으로 받아왔을 때
        console.log(response.data); // 받아온 데이터 확인 (개발 중에 유용함)
        // 기존 데이터와 새로 받아온 데이터를 합쳐서 업데이트
        setEventData([...eventData, ...response.data.eventList]);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error fetching event data:', error);
      });
  };

  const handleLoadMore = () => {
    setPage(page + 1); // 다음 페이지로 이동
  };

  const handleRowClick = (eventData) => {
    setSelectedEvent(eventData);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <EventWrapper>
      <Header>
        <HeaderRow>
          <HeaderCell width="80px">
            <TextWrapper>행사번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="100px" hasBorder>
            <TextWrapper>행사 타입</TextWrapper>
          </HeaderCell>
          <HeaderCell width="416px" hasBorder>
            <TextWrapper>제목</TextWrapper>
          </HeaderCell>
          <HeaderCell width="164px" hasBorder>
            <TextWrapper>시작일</TextWrapper>
          </HeaderCell>
          <HeaderCell width="164px" hasBorder>
            <TextWrapper>종료일</TextWrapper>
          </HeaderCell>
        </HeaderRow>
      </Header>
      <RowContainer>
        {eventData.map((event) => (
          <EventRow key={event.eventId} event={event} onRowClick={handleRowClick} />
        ))}
      </RowContainer>
      {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
      <LoadMoreContainer>
        <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
      </LoadMoreContainer>
    </EventWrapper>
  );
};

export default EventTable;

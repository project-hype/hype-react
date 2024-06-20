import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 800px; /* 최대 너비 설정 */
  max-height: 80%; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ButtonCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const AddButton = styled.button`
  width: 100%;
  height: 30px;
  cursor: pointer;
`;

const AddBannerModal = ({ onClose, onEventSelect }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events to populate the modal
  const fetchEvents = () => {
    axios
      .get('http://localhost:8080/admin/event/list/summary')
      .then((response) => {
        setEvents(response.data.eventList);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  };

  // Handle event selection
  const handleEventClick = (event) => {
    onEventSelect(event);
    onClose();
  };

  // Handle modal close
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalWrapper onClick={handleCloseModal}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Table>
          <thead>
            <tr>
              <TableHeader>행사 번호</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader></TableHeader> {/* 빈 문자열 */}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId}>
                <TableCell>{event.eventId}</TableCell>
                <TableCell>{event.title}</TableCell>
                <ButtonCell>
                  <AddButton onClick={() => handleEventClick(event)}>추가</AddButton>
                </ButtonCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AddBannerModal;

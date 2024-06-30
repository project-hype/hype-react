import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminAPI from '../../../api/admin/adminAPI';

/**
 * 관리자 페이지 - 배너 생성 모달창
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const AddBannerModal = ({ onClose, onEventSelect }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    AdminAPI.getEventSummary()
      .then((response) => {
        setEvents(response.data.eventList);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  };

  const handleEventClick = (event) => {
    onEventSelect(event);
    onClose();
  };

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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 800px;
  max-height: 80%;
  overflow-y: auto;
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

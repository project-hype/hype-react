import React, { useEffect, useState } from 'react';
import EventRow from './EventRow';
import EventEditModal from './EventEditModal';
import EventAddModal from './EventAddModal';
import ConfirmDelete from '../ConfirmDelete';
import AddButton from '../../common/AddButton';
import LoadMoreButton from '../../common/LodeMoreButton';
import AdminAPI from '../../../api/admin/adminAPI';
import { TableWrapper, Header, HeaderRow, HeaderCell, TextWrapper, Title } from '../common/styled';

/**
 * 관리자 페이지 - 행사 관리 테이블
 * @author 조영욱
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const EventTable = () => {
  const [eventData, setEventData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isNextEventExist, setIsNextEventExist] = useState(true);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = (pageNum) => {
    AdminAPI.getEventListPaging(pageNum)
      .then((response) => {
        setEventData([...eventData, ...response.data.eventList]);
        setIsNextEventExist(response.data.nextEventExist);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleRowClick = (eventData) => {
    setSelectedEvent(eventData);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleSaveEvent = (updatedEvent) => {
    const updatedEventData = eventData.map((event) => (event.eventId === updatedEvent.eventId ? updatedEvent : event));
    setEventData(updatedEventData);
    setSelectedEvent(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      setEventData(eventData.filter((event) => event.eventId !== selectedEvent.eventId));
      setConfirmDeleteOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedEvent(null);
    setConfirmDeleteOpen(false);
  };

  return (
    <TableWrapper>
      <Title>행사 관리</Title>
      <AddButton onClick={openAddModal} domain="행사" />
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
      <div>
        {eventData.map((event) => (
          <EventRow key={event.eventId} event={event} onRowClick={handleRowClick} onDeleteClick={handleDeleteClick} />
        ))}
      </div>
      {selectedEvent && (
        <EventEditModal
          event={selectedEvent}
          onClose={closeModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      {showAddModal && (
        <EventAddModal
          onClose={closeAddModal}
          onSave={(newEvent) => {
            setEventData([...eventData, newEvent]);
            closeAddModal();
          }}
        />
      )}
      <ConfirmDelete isOpen={confirmDeleteOpen} onConfirm={handleDeleteEvent} onCancel={handleCancelDelete} />
      {isNextEventExist && <LoadMoreButton onClick={handleLoadMore} />}
    </TableWrapper>
  );
};

export default EventTable;

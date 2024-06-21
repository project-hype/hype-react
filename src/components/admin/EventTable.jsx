import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EventRow from './EventRow';
import EventEditModal from './EventEditModal';
import EventAddModal from './EventAddModal';
import ConfirmDelete from './ConfirmDelete';
import Rectangle200 from '../../assets/img/common/Rectangle200.png';
import AddButton from '../common/AddButton';
import LoadMoreButton from '../common/LodeMoreButton';

// Styled Components
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #f0f5f4;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 49px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')};
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

// Component
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
    axios
      .get(`http://localhost:8080/admin/event/list?page=${pageNum}&amount=10`)
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
    <EventWrapper>
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
    </EventWrapper>
  );
};

export default EventTable;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 60%;
  max-width: 800px;
`;

const FormField = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    height: 120px; /* Increase height for larger textarea */
    resize: vertical; /* Allow vertical resizing */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #0070b3;
  color: white;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EventModal = ({ event, onClose, onSave }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  useEffect(() => {
    if (event.startDate) {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        startDate: formatDateString(event.startDate),
      }));
    }
    if (event.endDate) {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        endDate: formatDateString(event.endDate),
      }));
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedEvent);
    onClose();
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Event</h2>
        <FormField>
          <label>Title:</label>
          <input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>Content:</label>
          <textarea name="content" value={editedEvent.content} onChange={handleInputChange} rows={5} />
        </FormField>
        <FormField>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={editedEvent.startDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>End Date:</label>
          <input type="date" name="endDate" value={editedEvent.endDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>Address:</label>
          <input type="text" name="address" value={editedEvent.address} onChange={handleInputChange} />
        </FormField>
        <ButtonContainer>
          <Button onClick={handleSave}>수정</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventModal;

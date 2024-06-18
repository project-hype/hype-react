import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')};
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

const EventRow = ({ event, onRowClick }) => {
  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/event/detail/${event.eventId}`);
      const eventData = response.data; // Adjust according to your API response structure
      onRowClick(eventData); // Pass the event data to the parent component
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  return (
    <Row onClick={handleClick}>
      <Cell width="80px">
        <TextWrapper>{event.eventId}</TextWrapper>
      </Cell>
      <Cell width="100px" hasBorder>
        <TextWrapper>{event.eventTypeName}</TextWrapper>
      </Cell>
      <Cell width="416px" hasBorder>
        <TextWrapper>{event.title}</TextWrapper>
      </Cell>
      <Cell width="164px" hasBorder>
        <TextWrapper>{event.startDate.split(' ')[0]}</TextWrapper>
      </Cell>
      <Cell width="164px" hasBorder>
        <TextWrapper>{event.endDate.split(' ')[0]}</TextWrapper>
      </Cell>
    </Row>
  );
};

export default EventRow;

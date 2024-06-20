import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './EventList';
import '../../assets/scss/common.scss';
import styled from 'styled-components';

const EventWrapArticle = styled.article`
  margin-left: 150px;
  margin-right: 150px;
`;

function FilteredEvent({ selectedDate, selectedBranch, selectedEventTypes }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          date: selectedDate,
          branchId: selectedBranch || null,
          eventTypeIdList: selectedEventTypes,
        };

        const response = await axios.post('http://localhost:8080/event/list/filter', requestBody);
        const result = response.data.eventList;
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedDate, selectedBranch, selectedEventTypes]);

  return (
    <EventWrapArticle>
      <article>
        <div className="calendar-popup-list">
          <EventList events={data} />
        </div>
      </article>
    </EventWrapArticle>
  );
}

export default FilteredEvent;

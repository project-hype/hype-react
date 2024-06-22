import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList2 from './EventList2';
import '../../assets/scss/common.scss';
import styled from 'styled-components';
import LoadMoreButton from '../common/LodeMoreButton';

const EventWrapArticle = styled.article`
  margin-left: 150px;
  margin-right: 150px;
`;

function FilteredEvent({ keyword, selectedDate, selectedBranch, selectedEventTypes }) {
  const amount = 20;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isNextEventExist, setIsNextEventExist] = useState(false);
  const [prePage, setPrePage] = useState(page);

  const handleLoadMore = () => {
    setPrePage(page);
    setPage(page + 1);
  };

  const fetchData = async (isPage) => {
    try {
      const requestBody = {
        keyword: keyword,
        date: selectedDate,
        branchId: selectedBranch || null,
        eventTypeIdList: selectedEventTypes,
        page: page,
        amount: amount,
      };

      const response = await axios.post('http://localhost:8080/event/list/filter', requestBody);
      const result = response.data.eventList;

      setIsNextEventExist(response.data.nextEventExist);

      if (isPage) {
        setData([...data, ...result]);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPrePage(1);
    setPage(1);

    fetchData(false);
  }, [keyword, selectedDate, selectedBranch, selectedEventTypes]);

  useEffect(() => {
    if (page === 1 && prePage === 1) return;
    fetchData(true);
  }, [page]);

  return (
    <>
      <EventWrapArticle>
        <article>
          <div className="calendar-popup-list">
            <EventList2 events={data} />
          </div>
        </article>
      </EventWrapArticle>
      {isNextEventExist && <LoadMoreButton onClick={handleLoadMore} />}
    </>
  );
}

export default FilteredEvent;

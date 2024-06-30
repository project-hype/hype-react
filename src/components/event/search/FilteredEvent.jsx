import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../common/EventList';
import '../../../assets/scss/common.scss';
import styled from 'styled-components';
import LoadMoreButton from '../../common/LodeMoreButton';

const EventWrapArticle = styled.article`
  margin-left: 150px;
  margin-right: 150px;
`;

/**
 * 검색, 필터링 된 이벤트 결과 리스트 출력 컴포넌트
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
function FilteredEvent({ keyword, selectedDate, selectedBranch, selectedEventTypes }) {
  const amount = 20;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isNextEventExist, setIsNextEventExist] = useState(false);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchData = async (append = false, page = 1) => {
    try {
      const requestBody = {
        keyword,
        date: selectedDate,
        branchId: selectedBranch || null,
        eventTypeIdList: selectedEventTypes,
        page,
        amount,
      };

      const response = await axios.post('http://localhost:8080/event/list/filter', requestBody);
      const result = response.data.eventList;

      setIsNextEventExist(response.data.nextEventExist);

      if (append) {
        setData((prevData) => [...prevData, ...result]);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData(false, 1);
  }, [keyword, selectedDate, selectedBranch, selectedEventTypes]);

  useEffect(() => {
    if (page > 1) {
      fetchData(true, page);
    }
  }, [page]);

  return (
    <>
      <EventWrapArticle>
        <article>
          <div className="calendar-popup-list">
            <EventList events={data} />
          </div>
        </article>
      </EventWrapArticle>
      {isNextEventExist && <LoadMoreButton onClick={handleLoadMore} />}
    </>
  );
}

export default FilteredEvent;

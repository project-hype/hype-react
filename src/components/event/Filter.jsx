import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/scss/common.scss';
import FilterBranchSelect from './FilterBranchSelect';
import { FilterButton } from '../common/FilterButton';
import FilteredEvent from './FilteredEvent';

const FilterDiv = styled.div`
  height: 200px;
  position: relative;
  width: 1440px;
  margin-top: 40px;
  margin-left: 120px;
`;

const FilterColumn = styled.div`
  height: 48px;
  margin-left: 34px;
  margin-top: 10px;
`;

const FilterColumnName = styled.span`
  color: #000000;
  font-family: 'Happiness Sans-Title', Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 36px;
  letter-spacing: 0;
  width: 47px;
  margin-right: 5px;
`;

const DateInput = styled.input`
  font-family: '해피니스 산스 볼드';
  font-size: 16px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #e0ded8;
  border-radius: 20px;
  margin-left: 20px;
  width: 180px;
`;

function Filter() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleString('sv').substring(0, 10));
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedEventTypes, setSelectedEventTypes] = useState(['팝업', '전시', '공연', '강좌']);

  const handleFilterButtonClick = (type, value) => {
    if (type === 'date') {
      setSelectedDate(value);
    } else if (type === 'eventType') {
      setSelectedEventTypes((prevSelectedEventTypes) => {
        if (prevSelectedEventTypes.includes(value)) {
          if (prevSelectedEventTypes.length === 1) return prevSelectedEventTypes;
          return prevSelectedEventTypes.filter((eventType) => eventType !== value);
        } else {
          return [...prevSelectedEventTypes, value];
        }
      });
    }
  };

  const handleDateInputChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const getEventTypeIds = () => {
    const eventTypeMap = {
      팝업: 1,
      전시: 2,
      공연: 3,
      강좌: 4,
    };
    return selectedEventTypes.map((eventType) => eventTypeMap[eventType]);
  };

  return (
    <div className="container">
      <FilterDiv>
        <FilterColumn>
          <FilterColumnName>날짜</FilterColumnName>
          <DateInput type="date" value={selectedDate} onChange={handleDateInputChange} />
        </FilterColumn>
        <FilterColumn>
          <FilterColumnName>지점</FilterColumnName>
          <span style={{ marginLeft: '20px' }} />
          <FilterBranchSelect name="branch" value={selectedBranch} onChange={handleBranchChange} />
        </FilterColumn>
        <FilterColumn>
          <FilterColumnName>종류</FilterColumnName>
          {['팝업', '전시', '공연', '강좌'].map((eventType) => (
            <FilterButton
              key={eventType}
              onClick={() => handleFilterButtonClick('eventType', eventType)}
              active={selectedEventTypes.includes(eventType)}
            >
              {eventType}
            </FilterButton>
          ))}
        </FilterColumn>
      </FilterDiv>
      <FilteredEvent
        selectedDate={selectedDate}
        selectedBranch={selectedBranch}
        selectedEventTypes={getEventTypeIds()}
      />
    </div>
  );
}

export default Filter;

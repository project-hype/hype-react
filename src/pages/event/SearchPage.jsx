import React from 'react';
import MainLayout from '../../layout/MainLayout';
import '../../assets/scss/common.scss';
import { FilterButton } from '../../components/common/FilterButton';
import styled from 'styled-components';
import ArrowDown from '../../assets/img/common/arrowDown.png';

const Filter = styled.div`
  height: 200px;
  position: relative;
  width: 1440px;
  margin-top: 25px;
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

const Status = styled.div`
  height: 38px;
  overflow: hidden;
  width: 240px;
  display: flex;
  margin-left: 50px;
`;

const StatusText = styled.div`
  height: 37px;
  position: relative;
  top: 1px;
  width: 80px;
  font-size: 22px;
  font-weight: 700;
`;

const StatusImg = styled.img`
  height: 35px;
  width: 35px;
`;

function SearchPage() {
  const handleFilterButtonClick = () => {
    console.log('hi');
  };
  return (
    <div class="container">
      <MainLayout />
      <Filter>
        <FilterColumn>
          <FilterColumnName>날짜</FilterColumnName>
          <FilterButton onClick={handleFilterButtonClick}>오늘</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>+1일</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>+7일</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>+2주</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>+1달</FilterButton>
        </FilterColumn>
        <FilterColumn>
          <FilterColumnName>지점</FilterColumnName>
          <FilterButton onClick={handleFilterButtonClick}>전체</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>더현대 서울</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>더현대 천호</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>더현대 현대</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>현현대 현대</FilterButton>
        </FilterColumn>
        <FilterColumn>
          <FilterColumnName>상태</FilterColumnName>
          <FilterButton onClick={handleFilterButtonClick}>진행 중</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>오픈 임박</FilterButton>
          <FilterButton onClick={handleFilterButtonClick}>종료</FilterButton>
        </FilterColumn>
      </Filter>

      <Status>
        <StatusText>팝업</StatusText>
        <StatusImg src={ArrowDown} />
      </Status>
    </div>
  );
}

export default SearchPage;

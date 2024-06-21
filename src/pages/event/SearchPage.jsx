import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import '../../assets/scss/common.scss';
import Filter from '../../components/event/Filter';
import { PageTitle } from '../../components/member/MemberStyledComponents';
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  const preText = keyword ? `'${keyword}' ` : '';

  return (
    <div className="container">
      <MainLayout />
      <PageTitle>{preText}검색 결과</PageTitle>
      <Filter />
    </div>
  );
}

export default SearchPage;

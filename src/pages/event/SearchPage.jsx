import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import '../../assets/scss/common.scss';
import Filter from '../../components/event/Filter';
import { PageTitle } from '../../components/member/MemberStyledComponents';

function SearchPage() {
  return (
    <div className="container">
      <MainLayout />
      <PageTitle>검색 결과</PageTitle>
      <Filter />
    </div>
  );
}

export default SearchPage;

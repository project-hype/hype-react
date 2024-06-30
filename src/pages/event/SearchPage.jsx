import React from 'react';
import MainLayout from '../../layout/MainLayout';
import '../../assets/scss/common.scss';
import Filter from '../../components/event/search/Filter';
import { PageTitle } from '../../components/member/common/MemberStyledComponents';
import { useLocation } from 'react-router-dom';

/**
 * 검색 결과 페이지
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * </pre>
 */
function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  const preText = keyword ? `'${keyword}' ` : '';

  return (
    <div className="container">
      <MainLayout>
        <PageTitle>{preText}검색 결과</PageTitle>
        <Filter />
      </MainLayout>
    </div>
  );
}

export default SearchPage;

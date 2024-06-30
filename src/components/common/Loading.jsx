import React from 'react';
import Spinner from '../../assets/img/common/Spinner.svg';
import MainLayout from '../../layout/MainLayout';
import styled from 'styled-components';

/**
 * 화면 로딩 스피너
 * @author 정은지
 * @since 2024.06.22
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.22   정은지        최초 생성
 * </pre>
 */

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = () => {
  return (
    <MainLayout>
      <Load>
        <img src={Spinner} alt="로딩" width="10%" />
      </Load>
    </MainLayout>
  );
};

export default Loading;

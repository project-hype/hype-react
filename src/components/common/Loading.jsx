import React from 'react';
import Spinner from '../../assets/img/common/Spinner.svg';
import MainLayout from '../../layout/MainLayout';
import styled from 'styled-components';

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

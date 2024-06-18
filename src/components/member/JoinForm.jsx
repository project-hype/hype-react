import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

// Styled components
const Container = styled.div`
  position: relative;
  width: 1440px;
  height: 1850px;
  background-color: #fff;
  overflow: hidden;

  .top-bar {
    position: absolute;
    left: 0;
    top: 1778px;
    width: 1440px;
    height: 72px;
    background-color: #1e1e1e;
  }

  .header {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 152px;
    padding: 24px 56px;
    background-color: #fff;
    backdrop-filter: blur(2px);

    img {
      width: 130px;
      height: 65px;
    }

    .search-box {
      width: 680px;
      height: 42px;
      flex: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 14px;
      background-color: #eaeaea;
      border: 2px solid #fff;
      border-radius: 160px;

      img {
        width: 23px;
        height: 23px;
      }
    }

    .menu {
      position: relative;
      width: 214px;
      height: 49px;
      flex: none;

      .menu-item {
        position: absolute;
        top: 11px;
        font-size: 22px;
        font-family: 'Happiness_Sans', sans-serif;
        font-weight: bold;
        color: #000;
        white-space: nowrap;

        &.login {
          left: 0;
        }

        &.signup {
          left: 86px;
        }
      }

      .menu-icon {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        height: 49px;
        padding: 13px 0;

        img {
          width: 22px;
          height: 24px;
          object-fit: fill;
        }
      }
    }
  }

  .content {
    position: absolute;
    left: 50%;
    top: calc(50% - 95px);
    transform: translateX(-50%);
    width: 1436px;
    height: 1344px;

    /* Your content styles go here */
  }
`;

const 회원가입페이지 = () => {
  return (
    <Container>
      <div className="content">{/* Your content sections */}</div>
    </Container>
  );
};

export default 회원가입페이지;

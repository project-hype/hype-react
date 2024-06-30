import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import styled from 'styled-components';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

/**
 * Footer
 * @author 임원정
 * @since 2024.06.21
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.21   임원정        최초 생성
 * </pre>
 */

const FooterContainer = styled.footer`
  display: flex;
  background-color: #eaeaea;
  position: relative;
  padding: 24px 150px;
  height: fit-content;
  color: #595959;
  flex-direction: column;
  justify-content: center;
  margin-top: auto;
`;

const Info = styled.p`
  font-family: '해피니스 산스 레귤러';
  font-size: 14px;
  margin: 3px 0;
`;

const ProjectTitle = styled.span`
  font-family: '해피니스 산스 타이틀';
  font-weight: bold;
  font-size: 16px;
  margin: 5px 0;
`;

const Link = styled.a`
  color: #595959;
  text-decoration: none;
  margin-right: 16px;
  fontweight: 'bold';
  &:hover {
    text-decoration: underline;
  }
`;

const LinkContainer = styled.div`
  font-family: '해피니스 산스 볼드';
  font-size: 14px;
  margin-top: 8px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ProjectTitle>HYPE(Hyundai-Your Place Explorer)</ProjectTitle>
      <Info>by devjeans(임원정, 조영욱, 정은지)</Info>
      <Info>ⓒ 2024. devjeans All rights reserved.</Info>
      <LinkContainer>
        <Link href="/">
          <FontAwesomeIcon icon={faHouse} /> 홈
        </Link>
        <Link href="https://github.com/project-hype">
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </Link>
      </LinkContainer>
    </FooterContainer>
  );
};

export default Footer;

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

// Main Container
// const Container = styled.div`
//   position: relative;
//   width: 1440px;
//   height: 1850px;
//   background-color: #fff;
//   overflow: hidden;
// `;

const Container = styled.div`
  position: absolute;
  left: 206px;
  top: 58px;
  width: 1022px;
  height: 122px;
  display: flex;
`;

const InputContainer = styled.div`
  position: relative;
  width: 1022px;
  height: 122px;
  overflow: hidden;
`;

const Separator = styled.div`
  position: absolute;
  left: 15px;
  top: 93px;
  width: 1000px;
  height: 0;
  border: 2px solid #e0ded8;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 53px;
  width: 94px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e0ded8;
  border-radius: 15px;
  overflow: hidden;
`;

const ButtonText = styled.div`
  font-family: 'Happiness_Sans';
  font-weight: bold;
  font-size: 14px;
  color: #595959;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ErrorText = styled.div`
  position: absolute;
  left: 15px;
  top: 123px;
  width: 388px;
  height: 29px;
  font-family: 'Happiness_Sans';
  font-weight: bold;
  font-size: 11px;
  color: #f00;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LabelContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 0;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-family: 'Happiness_Sans';
  font-weight: bold;
  font-size: 20px;
  color: #595959;
`;

const Asterisk = styled.span`
  color: #f00;
`;

const RequiredNotice = styled.div`
  position: absolute;
  left: 1095px;
  top: 22px;
  width: 150px;
  height: 29px;
  font-family: 'Happiness_Sans';
  font-weight: bold;
  font-size: 11px;
  color: #000;
  display: flex;
  align-items: center;
`;

const DescriptionText = styled.span`
  color: #000;
`;

const InputField = styled.input`
  position: absolute;
  left: 15px;
  top: 60px; /* Adjusted top position to be just above the Separator */
  width: 970px; /* Adjusted width to fit within the Separator */
  height: 30px;
  font-family: 'Happiness_Sans';
  font-size: 16px;
  border: none; /* Removed border */
  outline: none; /* Removed outline */
  background: transparent; /* Made background transparent */
  padding: 5px 10px;
`;

const IdInput = () => {
  return (
    <>
      <Container>
        <InputContainer>
          <Separator />
          <LabelContainer>
            <Label>
              <Asterisk>*</Asterisk> ID
            </Label>
          </LabelContainer>
          <InputField type="text" placeholder="ID를 입력하세요" />
          <ButtonContainer>
            <ButtonText>중복 확인</ButtonText>
          </ButtonContainer>
          <ErrorText>중복된 아이디가 있습니다.</ErrorText>
        </InputContainer>
      </Container>
      <RequiredNotice>
        <Asterisk>*</Asterisk> <DescriptionText>는 필수 입력 사항입니다.</DescriptionText>
      </RequiredNotice>
    </>
  );
};

// Interest Categories Section
const CategoriesContainer = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 95px);
  transform: translateX(-50%) translateY(-50%);
`;

const CategoryBox = styled.div`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
  border-radius: 35px;
  overflow: hidden;
`;

const CategoryText = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: 'Happiness_Sans';
  font-weight: bold;
  color: ${(props) => props.color};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Frequently Visited Locations Section
const LocationsContainer = styled.div`
  position: absolute;
  left: 207px;
  top: 900px;
`;

const LocationBox = styled.div`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
  border-radius: 35px;
  overflow: hidden;
`;

const LocationText = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: 'Happiness_Sans';
  font-weight: bold;
  color: ${(props) => props.color};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JoinForm = () => {
  return (
    <Container>
      <IdInput />

      <CategoriesContainer>
        {/* Categories */}
        <CategoryBox left="26px" top="58px" width="122px" height="43px" padding="10px" bgColor="#ff8c00">
          <CategoryText color="#fff">패션/뷰티</CategoryText>
        </CategoryBox>
        {/* More category boxes go here... */}
      </CategoriesContainer>

      <LocationsContainer>
        {/* Locations */}
        <LocationBox left="26px" top="57px" width="107px" height="43px" padding="10px" bgColor="#ff8c00">
          <LocationText color="#fff">미아점</LocationText>
        </LocationBox>
        {/* More location boxes go here... */}
      </LocationsContainer>

      {/* Other sections can be similarly structured... */}
    </Container>
  );
};
export default JoinForm;

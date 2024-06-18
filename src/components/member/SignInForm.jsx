import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // 전체 화면 높이
`;

const HypeLogo = styled.img`
  width: 320px;
  height: auto;
  cursor: pointer;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: #595959;
  font-family: '해피니스 산스 타이틀';
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #595959;
  border-radius: 20px;
  height: 54px;
  width: 501px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  width: 90%;
  height: 50%;
  font-size: 15px;
  padding: 10px;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 501px; /* FormContainer와 같은 너비 */
  margin-bottom: 20px;
`;

const SignUpPrompt = styled.div`
  color: #595959;
  font-family: '해피니스 산스 타이틀';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const ButtonWrapper = styled.button`
  align-items: center;
  background-color: #1e9d8b;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 55px;
  padding: 10px;
  width: 142px;
  cursor: pointer;
`;

const ButtonText = styled.div`
  color: #ffffff;
  font-family: '해피니스 산스 타이틀';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
`;

function SignInForm({ onSignIn }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSignIn(userId, password);
    },
    [userId, password, onSignIn],
  );

  const handleHomeClick = () => {
    console.log('Home button clicked');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <HypeLogo src={hypeLogo} alt="Home" onClick={handleHomeClick} />
      <InputContainer>
        <Label htmlFor="userId">아이디</Label>
        <FormContainer>
          <Input type="text" id="userId" value={userId} onChange={handleChangeUserId} />
        </FormContainer>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password">비밀번호</Label>
        <FormContainer>
          <Input type="password" id="password" value={password} onChange={handleChangePassword} />
        </FormContainer>
      </InputContainer>
      <SignUpContainer>
        <div></div>
        <SignUpPrompt>아직 회원이 아니신가요?</SignUpPrompt>
      </SignUpContainer>
      <ButtonWrapper type="submit">
        <ButtonText>로그인</ButtonText>
      </ButtonWrapper>
    </StyledForm>
  );
}

export default SignInForm;

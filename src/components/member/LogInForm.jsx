import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/authState'; // Recoil 상태 import
import Button from '../common/Button';
import Modal from '../common/Modal';
import MemberAPI from '../../api/member/memberAPI';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh; // 전체 화면 높이
  margin-top: 80px;
  margin-bottom: 80px;
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
  font-size: 16px;
  padding: 10px;
  &:focus {
    outline: none;
  }
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

function LogInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState(false); // 로그인 실패 상태 추가
  const [user, setUser] = useRecoilState(userState); // Recoil 상태 사용
  const navigate = useNavigate();

  const handleChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await MemberAPI.login(username, password)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            isLoggedIn: true,
            userInfo: response.data,
            isAdmin: response.data.isAdmin === 1,
          });
          if (response.data.isAdmin === 1) {
            navigate('/admin');
            return;
          }
          navigate('/');
          console.log(user.userInfo);
        }
      })
      .catch((error) => {
        if (error.response || error.response.status === 401) {
          setShowModal(true);
          setLoginError(true); // HTTP 401 에러일 경우 로그인 실패 상태를 true로 설정
        }
        //console.log(error);
      });
  };

  const handleConfirm = () => {
    setShowModal(false);
    setLoginError(false); // 모달을 닫을 때 로그인 실패 상태를 초기화
  };

  return (
    <>
      {showModal && (
        <Modal message={'로그인에 실패했습니다. ID나 비밀번호를 확인해주세요.'} onConfirm={handleConfirm} />
      )}
      <StyledForm onSubmit={handleSubmit}>
        <HypeLogo src={hypeLogo} />
        <InputContainer>
          <Label htmlFor="username">아이디</Label>
          <FormContainer>
            <Input type="text" id="username" value={username} onChange={handleChangeUsername} />
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
          <SignUpPrompt>
            <Link to="/join">아직 회원이 아니신가요?</Link>
          </SignUpPrompt>
        </SignUpContainer>
        <Button type="submit" text="로그인" />
      </StyledForm>
    </>
  );
}

export default LogInForm;

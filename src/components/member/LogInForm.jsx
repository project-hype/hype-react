import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

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

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px; /* 너비 설정 */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function LogInForm({ onLogIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState(false); // 로그인 실패 상태 추가
  const navigate = useNavigate();

  const handleChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('http://localhost:8080/member/login', {
        username: username,
        password: password,
      });
      if (res.status === 200) {
        setShowModal(true); // 로그인 성공시 모달을 보여줌
        console.log(res.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowModal(true);
        setLoginError(true); // HTTP 400 에러일 경우 로그인 실패 상태를 true로 설정
      }
      console.log(error);
    }
  };
  //   const handleSubmit = useCallback(
  //     (e) => {
  //       e.preventDefault();
  //       axios
  //         .post(
  //           'localhost:8080/login?username=test&password=test1234',
  //           {
  //             username: username,
  //             password: password,
  //           },
  //           {
  //             withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
  //           },
  //         )
  //         .then((response) => {
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(username, password);
  //           console.log(error);
  //         });
  //     },
  //     [username, password, onSignIn],
  //   );

  const handleHomeClick = () => {
    console.log('Home button clicked');
    navigate('/');
  };

  const handleConfirm = () => {
    setShowModal(false);
    setLoginError(false); // 모달을 닫을 때 로그인 실패 상태를 초기화
    if (!loginError) {
      navigate('/'); // 성공 시 루트 페이지로 이동
    }
  };

  return (
    <>
      {showModal && (
        <>
          <Overlay />
          <Modal>
            {loginError ? (
              <p>
                로그인에 실패했습니다.
                <br />
                ID나 비밀번호를 확인해주세요.
              </p>
            ) : (
              <p>로그인 성공했습니다</p>
            )}
            <Button text="확인" bgColor="#FF8C00" onClick={handleConfirm} />
          </Modal>
        </>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <HypeLogo src={hypeLogo} alt="Home" onClick={handleHomeClick} />
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
            <a href="">아직 회원이 아니신가요?</a>
          </SignUpPrompt>
        </SignUpContainer>
        <Button type="submit" text="로그인" />
      </StyledForm>
    </>
  );
}

export default LogInForm;

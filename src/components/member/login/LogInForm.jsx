import React, { useCallback, useState } from 'react';
import {
  StyledForm,
  HypeLogo,
  InputContainer,
  Label,
  FormContainer,
  Input,
  SignUpContainer,
  SignUpPrompt,
} from './LoginStyled';
import hypeLogo from '../../../assets/img/layout/hypeLogo2.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../../state/authState'; // Recoil 상태 import
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import MemberAPI from '../../../api/member/memberAPI';

/**
 * 로그인
 * @author 임원정
 * @since 2024.06.19
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.19   임원정        최초 생성
 * 2024.06.20   임원정        React Recoil 적용
 * 2024.06.30   임원정        코드 리팩토링(API 적용, 스타일드 컴포넌트 분리)
 * </pre>
 */

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

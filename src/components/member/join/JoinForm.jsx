import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NoticeSection,
  Asterisk,
  DescriptionText,
  InputSection,
  ButtonContainer,
  CheckButton,
  RadioGroup,
  BirthdateInput,
} from '../common/MemberStyledComponents'; // 스타일 컴포넌트를 import 합니다
import Input from './Input';
import InputContainer from './InputContainer';
import CategoryButtonGroup from '../common/CategoryButtonGroup';
import CitySelect from '../common/CitySelect';
import BranchSelect from '../common/BranchSelect';
import RadioButton from '../common/RadioButton';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import MemberAPI from '../../../api/member/memberAPI';

/**
 * 회원가입 폼 컴포넌트
 * @author 임원정
 * @since 2024.06.19
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.19   임원정        최초 생성
 * 2024.06.20   임원정        회원관련 공동 컴포넌트 분리
 * 2024.06.22   임원정        중복 ID 관련 기능 수정
 * 2024.06.30   임원정        코드 리팩토링(API 적용)
 * </pre>
 */

const JoinForm = () => {
  const [form, setForm] = useState({
    loginId: '',
    name: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    gender: '',
    cityId: '1',
    preferBranchId: '',
    category: [],
  });
  const [duplicateIdError, setDuplicateIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [joinError, setJoinError] = useState(true);
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 중복 아이디 여부 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // 비밀번호와 비밀번호 확인이 일치하는지 확인
      if (name === 'password' || name === 'confirmPassword') {
        if (updatedForm.password !== updatedForm.confirmPassword) {
          setPasswordError('비밀번호가 일치하지 않습니다.');
          setJoinError(true);
        } else {
          setPasswordError('');
          setJoinError(false);
        }
      }

      return updatedForm;
    });

    // ID 중복 확인 오류 메시지 초기화
    if (name === 'loginId') {
      setDuplicateIdError('');
      //setIsIdAvailable(false); // 아이디가 변경될 때 중복 여부 상태 초기화
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId)); // 이미 선택된 버튼이면 제거
    } else {
      setSelectedCategories([...selectedCategories, categoryId]); // 새로 선택된 버튼이면 추가
    }
    setForm((prevForm) => {
      const category = prevForm.category.includes(categoryId)
        ? prevForm.category.filter((id) => id !== categoryId)
        : [...prevForm.category, categoryId];
      return { ...prevForm, category };
    });
  };

  const checkIdAvailability = async () => {
    await MemberAPI.checkID(form.loginId)
      .then((response) => {
        if (response.status === 200) {
          setShowModal(false);
          setDuplicateIdError('사용 가능한 아이디입니다.'); // ID가 사용 가능하면 에러 메시지를 비움
          setIsIdAvailable(true); // 사용 가능한 아이디일 때 상태 변경
          setJoinError(false);
        }
      })
      .catch((error) => {
        setShowModal(false);
        setDuplicateIdError('중복된 아이디가 있습니다.');
        setIsIdAvailable(false); // 중복된 아이디일 때 상태 변경
        setJoinError(true);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 중복 확인을 거치지 않고 가입 시도 방지
    if (!isIdAvailable) {
      if (duplicateIdError === '중복된 아이디가 있습니다.') {
        setShowModal(true);
        setModalMessage('중복된 아이디가 있습니다.');
        return;
      }
      setShowModal(true);
      setModalMessage('아이디 중복을 확인해주세요.');
      return;
    }

    if (passwordError === '비밀번호가 일치하지 않습니다.') {
      setModalMessage('비밀번호가 일치하지 않습니다.');
      setShowModal(true);
      return;
    }

    // 생년월일에 9시간 더하기
    const birthdate = new Date(form.birthdate);
    birthdate.setHours(birthdate.getHours() + 9);
    const adjustedBirthdate = birthdate.toISOString(); // 서버가 기대하는 형식에 맞게 조정

    // confirmPassword를 제외한 form 데이터 생성
    const { confirmPassword, ...submitForm } = form;
    submitForm.birthdate = adjustedBirthdate;
    // category 배열 형식으로 전달
    submitForm.category = submitForm.category.map((id) => ({ categoryId: id }));

    await MemberAPI.join(submitForm)
      .then((response) => {
        if (response.status === 200) {
          setModalMessage('가입해주셔서 감사합니다.');
          setJoinError(false);
          setShowModal(true);
        }
      })
      .catch((error) => {
        if (error.response || error.response.status === 400) {
          setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
          setShowModal(true);
          setJoinError(true);
        }
      });
  };

  const handleConfirm = () => {
    setShowModal(false);
    setJoinError(false); // 모달을 닫을 때 로그인 실패 상태를 초기화
    if (!joinError && isIdAvailable) {
      navigate('/login');
    }
  };

  return (
    <>
      {showModal && <Modal message={modalMessage} onConfirm={handleConfirm} />}
      <form onSubmit={handleSubmit}>
        <InputSection>
          <InputContainer label="아이디" required error={duplicateIdError} divider>
            <NoticeSection>
              <Asterisk>*</Asterisk> <DescriptionText>는 필수 입력 사항입니다.</DescriptionText>
            </NoticeSection>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                placeholder="ID를 입력하세요"
                required
              />
              <CheckButton onClick={checkIdAvailability}>중복 확인</CheckButton>
            </div>
          </InputContainer>

          <InputContainer label="비밀번호" required divider>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </InputContainer>

          <InputContainer label="비밀번호 확인" required error={passwordError} divider>
            <Input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </InputContainer>

          <InputContainer label="이름" required divider>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </InputContainer>

          <InputContainer label="생년월일" required divider>
            <BirthdateInput
              className="birthdate-input"
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer label="성별" required divider>
            <RadioGroup>
              <RadioButton
                label="남성"
                type="radio"
                name="gender"
                value="M"
                checked={form.gender === 'M'}
                onChange={handleChange}
                required
              />
              <RadioButton
                label="여성"
                type="radio"
                name="gender"
                value="W"
                checked={form.gender === 'W'}
                onChange={handleChange}
                required
              />
            </RadioGroup>
          </InputContainer>

          <InputContainer label="지역" required divider>
            <CitySelect name="cityId" value={form.cityId} onChange={handleChange} />
          </InputContainer>

          <InputContainer label="자주 가는 지점" divider>
            <BranchSelect name="preferBranchId" value={form.preferBranchId} onChange={handleChange} />
          </InputContainer>

          <InputContainer label="관심카테고리">
            <CategoryButtonGroup selectedCategories={selectedCategories} handleCategoryClick={handleCategoryClick} />
          </InputContainer>
        </InputSection>

        <ButtonContainer>
          <Button type="submit" text="가입하기" />
        </ButtonContainer>
      </form>
    </>
  );
};

export default JoinForm;

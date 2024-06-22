import { InputSection, ButtonContainer } from './MemberStyledComponents';
import Input from './Input';
import InputContainer from './InputContainer';
import CategoryButtonGroup from './CategoryButtonGroup';
import CitySelect from './CitySelect';
import BranchSelect from './BranchSelect';
import Button from '../common/Button';
import Modal from '../common/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../state/authState';

const MyPageForm = () => {
  const [form, setForm] = useState({
    loginId: '',
    name: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    gender: '',
    cityId: '',
    preferBranchId: '',
    category: [],
  });

  const [passwordError, setPasswordError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const user = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    // Recoil 상태에서 유저 정보를 가져와 form에 설정
    if (user.isLoggedIn && user.userInfo.memberId) {
      setForm({
        loginId: user.userInfo.loginId || '',
        name: user.userInfo.name || '',
        password: '',
        confirmPassword: '',
        birthdate: user.userInfo.birthdate ? new Date(user.userInfo.birthdate).toISOString().split('T')[0] : '',
        gender: user.userInfo.gender === 'M' ? '남성' : user.userInfo.gender === 'W' ? '여성' : '',
        cityId: user.userInfo.cityId || '',
        preferBranchId: user.userInfo.preferBranchId || '',
        category: user.userInfo.memberCategory ? user.userInfo.memberCategory.map((cat) => cat.categoryId) : [],
      });
      setSelectedCategories(
        user.userInfo.memberCategory ? user.userInfo.memberCategory.map((cat) => cat.categoryId) : [],
      );
    } else {
      // 로그인이 되어 있지 않다면 메인 페이지로 리다이렉트
      navigate('/');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // 비밀번호와 비밀번호 확인이 일치하는지 확인
      if (name === 'password' || name === 'confirmPassword') {
        if (updatedForm.password !== updatedForm.confirmPassword) {
          setPasswordError('비밀번호가 일치하지 않습니다.');
          setUpdateError(true);
        } else {
          setPasswordError('');
          setUpdateError(false);
        }
      }

      return updatedForm;
    });
  };

  // const handleCategoryClick = (categoryId) => {
  //   if (selectedCategories.includes(categoryId)) {
  //     setSelectedCategories(selectedCategories.filter((id) => id !== categoryId)); // 이미 선택된 버튼이면 제거
  //   } else {
  //     setSelectedCategories([...selectedCategories, categoryId]); // 새로 선택된 버튼이면 추가
  //   }
  //   setForm((prevForm) => {
  //     const category = prevForm.category.includes(categoryId)
  //       ? prevForm.category.filter((id) => id !== categoryId)
  //       : [...prevForm.category, categoryId];
  //     return { ...prevForm, category };
  //   });
  // };

  // const handleCategoryClick = (categoryId) => {
  //   if (!selectedCategories) {
  //     setSelectedCategories([categoryId]);
  //   } else if (selectedCategories.includes(categoryId)) {
  //     setSelectedCategories(selectedCategories.filter((id) => id !== categoryId)); // 이미 선택된 버튼이면 제거
  //   } else {
  //     setSelectedCategories([...selectedCategories, categoryId]); // 새로 선택된 버튼이면 추가
  //   }

  //   setForm((prevForm) => {
  //     const category = prevForm.category.includes(categoryId)
  //       ? prevForm.category.filter((id) => id !== categoryId)
  //       : [...prevForm.category, categoryId];
  //     return { ...prevForm, category };
  //   });
  // };

  const handleCategoryClick = (categoryId) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategories);

    setForm((prevForm) => {
      const category = prevForm.category.includes(categoryId)
        ? prevForm.category.filter((id) => id !== categoryId)
        : [...prevForm.category, categoryId];
      return { ...prevForm, category };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // form 데이터에서 null 값인 category 필드를 제외하고 유효한 값들만 필터링
    const validCategories = form.category ? form.category.filter((cat) => cat !== null) : [];

    const submitForm = {
      memberId: user.userInfo.memberId,
      password: form.password,
      cityId: form.cityId,
      preferBranchId: form.preferBranchId,
      category: validCategories,
    };

    await axios
      .put('http://localhost:8080/member/update', submitForm)
      .then((response) => {
        if (response.status === 200) {
          setShowUpdateModal(true);
          setForm({ password: '', confirmPassword: '' });
        }
      })
      .catch((error) => {
        if (error.response || error.response.status === 400) {
          setShowUpdateModal(true);
          setUpdateError(true);
        }
      });
  };

  const handleUpdateConfirm = () => {
    setShowUpdateModal(false);
    setUpdateError(false);
  };

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(`http://localhost:8080/member/delete/${user.userInfo.memberId}`);

      if (response && response.status === 200) {
        // 성공적인 응답 처리
        resetUserState();
        localStorage.clear();
        sessionStorage.clear();
        setShowDeleteModal(false);
        navigate('/');
      } else {
        console.error('삭제 요청이 실패하였습니다.');
        // 실패 처리
      }
    } catch (error) {
      console.error('삭제 요청 중 오류 발생:', error.message);
      // 오류 처리
    }
  };

  const handleConfirmDelete = () => {
    setIsConfirmDelete(true);
    setShowDeleteModal(true);
  };

  const handleConfirmModal = () => {
    setShowDeleteModal(false);
    setIsConfirmDelete(false);
    if (!deleteError) {
      navigate('/');
    }
  };

  return (
    <>
      {showUpdateModal && (
        <Modal
          message={updateError ? '회원정보 수정에 실패했습니다. 다시 시도해주세요.' : '회원정보가 수정되었습니다.'}
          onConfirm={handleUpdateConfirm}
        />
      )}
      {showDeleteModal && (
        <Modal
          message={deleteError ? '회원 탈퇴에 실패했습니다. 다시 시도해주세요.' : '정말로 탈퇴하시겠습니까?'}
          onConfirm={deleteError ? handleConfirmModal : handleDelete}
          onCancel={deleteError ? null : () => setShowDeleteModal(false)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputSection>
          <InputContainer label="ID" divider>
            <Input type="text" name="loginId" value={form.loginId} readOnly />
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

          <InputContainer label="이름" divider>
            <Input type="text" name="name" value={form.name} readOnly />
          </InputContainer>

          <InputContainer label="생년월일" divider>
            <Input type="date" name="birthdate" value={form.birthdate} readOnly />
          </InputContainer>

          <InputContainer label="성별" divider>
            <Input type="text" name="gender" value={form.gender} readOnly />
          </InputContainer>

          <InputContainer label="지역" required divider>
            <CitySelect name="cityId" value={form.cityId} onChange={handleChange}></CitySelect>
          </InputContainer>

          <InputContainer label="자주 가는 지점" divider>
            <BranchSelect name="preferBranchId" value={form.preferBranchId} onChange={handleChange}></BranchSelect>
          </InputContainer>

          <InputContainer label="관심카테고리">
            <CategoryButtonGroup selectedCategories={selectedCategories} handleCategoryClick={handleCategoryClick} />
          </InputContainer>
        </InputSection>

        <ButtonContainer>
          <Button type="submit" text="수정하기" />
          <Button type="button" bgcolor="#595959" text="탈퇴하기" onClick={handleConfirmDelete} />
        </ButtonContainer>
      </form>
    </>
  );
};

export default MyPageForm;

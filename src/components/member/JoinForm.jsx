import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import axios from 'axios';

// 공통 스타일
const Container = styled.div`
  position: relative;
  width: 50%;
  background-color: #fff;
  padding-top: 16px;
  margin: 0 auto;
`;

const NoticeSection = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  margin-bottom: 8px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

const Separator = styled.div`
  position: absolute;
  left: 15px;
  top: 93px;
  width: calc(100% - 30px);
  border: 2px solid #e0ded8;
`;

const LabelContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
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

const InputField = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  font-family: 'Happiness_Sans';
  font-size: 16px;
  border: 1px solid #e0ded8;
  border-radius: 5px;
`;

const SelectField = styled.select`
  width: calc(100% - 24px);
  padding: 10px;
  font-family: 'Happiness_Sans';
  font-size: 16px;
  border: 1px solid #e0ded8;
  border-radius: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.label`
  margin-right: 20px;
  font-family: '해피니스 산스 레귤러';
  font-size: 16px;
  color: #595959;
  input {
    margin-right: 5px;
  }
`;

const JoinButtonContainer = styled.div`
  margin-top: 56px;
  margin-bottom: 56px;
  display: flex;
  justify-content: center;
`;

const ErrorText = styled.div`
  font-family: 'Happiness_Sans';
  font-weight: bold;
  font-size: 11px;
  color: #f00;
  margin-top: 10px;
`;

// 버튼 스타일
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledButtonWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => (props.selected ? '#ff8c00' : '#fff')};
  border-radius: 35px;
  display: flex;
  gap: 10px;
  height: 43px;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 107px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '1px solid #ff8c00;' : '1px solid #E0DED8')}; /* 선택됐을 때의 테두리 색상 */
  margin-top: 16px;
  margin-right: 40px;
`;

const StyledButtonText = styled.div`
  color: ${(props) => (props.selected ? '#fff' : '#1E1E1E')};
  font-family: '해피니스 산스 타이틀';
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
`;

const DescriptionText = styled.span`
  color: #000;
`;

const CheckButton = styled.button`
  margin-left: 8px;
  padding: 10px;
  width: 128px;
  height: 43px;
  font-family: 'Happiness_Sans';
  font-size: 14px;
  justifycontent: 'center';
  border: 1px solid #e0ded8;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 회원가입 폼 컴포넌트
const JoinForm = () => {
  const [form, setForm] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    cityId: '',
    preferBranchId: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // 입력값이 변경되면 에러 메시지를 초기화
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId)); // 이미 선택된 버튼이면 제거
    } else {
      setSelectedCategories([...selectedCategories, categoryId]); // 새로 선택된 버튼이면 추가
    }
    setForm((prevForm) => ({ ...prevForm, categoryId }));
  };

  const checkIdAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:8080/member/checkLoginId', { loginId: form.loginId });
      const result = response.data;
      console.log(typeof result);
      console.log(result);
      if (result === 'sucess') {
        setError(''); // ID가 사용 가능하면 에러 메시지를 비움
      } else {
        setError('중복된 아이디가 있습니다.'); // ID가 중복되면 에러 메시지 설정
      }
    } catch (error) {
      console.error('Error checking ID availability:', error);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('');
    console.log('Form submitted', form);
    navigate('/');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Section>
          <NoticeSection>
            <Asterisk>*</Asterisk> <DescriptionText>는 필수 입력 사항입니다.</DescriptionText>
          </NoticeSection>
          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> ID
              </Label>
            </LabelContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputField
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                placeholder="ID를 입력하세요"
                required
              />
              <CheckButton onClick={checkIdAvailability}>중복 확인</CheckButton>
            </div>
            <ErrorText>{error}</ErrorText>
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> 비밀번호
              </Label>
            </LabelContainer>
            <InputField
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> 비밀번호 확인
              </Label>
            </LabelContainer>
            <InputField
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </InputContainer>

          {error && <ErrorText>{error}</ErrorText>}

          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> 생년월일
              </Label>
            </LabelContainer>
            <InputField type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> 성별
              </Label>
            </LabelContainer>
            <RadioGroup>
              <RadioButton>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                  required
                />
                남성
              </RadioButton>
              <RadioButton>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                  required
                />
                여성
              </RadioButton>
            </RadioGroup>
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>
                <Asterisk>*</Asterisk> 지역
              </Label>
            </LabelContainer>
            <SelectField name="cityId" value={form.cityId} onChange={handleChange} required>
              <option value="">-------------------------------</option>
              <option value="1">서울특별시</option>
              <option value="2">부산광역시</option>
              <option value="3">대구광역시</option>
              <option value="4">인천광역시</option>
              <option value="5">대전광역시</option>
              <option value="6">광주광역시</option>
              <option value="7">울산광역시</option>
              <option value="8">세종시</option>
              <option value="9">경기도</option>
              <option value="10">강원도</option>
              <option value="11">충청북도</option>
              <option value="12">충청남도</option>
              <option value="13">전라북도</option>
              <option value="14">전라남도</option>
              <option value="15">경상북도</option>
              <option value="16">경상남도</option>
              <option value="17">제주도</option>
            </SelectField>
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>자주 가는 지점</Label>
            </LabelContainer>
            <SelectField name="branchId" value={form.branchId} onChange={handleChange} required>
              <option value="">-------------------------------</option>
              <option value="1">더현대 서울</option>
              <option value="2">압구정본점</option>
              <option value="3">무역센터점</option>
              <option value="4">천호점</option>
              <option value="5">신촌점</option>
              <option value="6">미아점</option>
              <option value="7">목동점</option>
              <option value="8">디큐브시티</option>
              <option value="9">중동점</option>
              <option value="10">판교점</option>
              <option value="11">킨텍스점</option>
              <option value="12">부산점</option>
              <option value="13">더현대 대구</option>
              <option value="14">울산점</option>
              <option value="15">울산동구점</option>
              <option value="16">충청점</option>
            </SelectField>
          </InputContainer>

          <InputContainer>
            <LabelContainer>
              <Label>관심카테고리</Label>
            </LabelContainer>
            <div>
              <ButtonGroup>
                <StyledButtonWrapper selected={selectedCategories.includes(1)} onClick={() => handleCategoryClick(1)}>
                  <StyledButtonText selected={selectedCategories.includes(1)}>브랜드</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(2)} onClick={() => handleCategoryClick(2)}>
                  <StyledButtonText selected={selectedCategories.includes(2)}> 패션/뷰티</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(3)} onClick={() => handleCategoryClick(3)}>
                  <StyledButtonText selected={selectedCategories.includes(3)}>식품/요리</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(4)} onClick={() => handleCategoryClick(4)}>
                  <StyledButtonText selected={selectedCategories.includes(4)}>리빙</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(5)} onClick={() => handleCategoryClick(5)}>
                  <StyledButtonText selected={selectedCategories.includes(5)}>헬스/스포츠</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(6)} onClick={() => handleCategoryClick(6)}>
                  <StyledButtonText selected={selectedCategories.includes(6)}>소품/굿즈</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(7)} onClick={() => handleCategoryClick(7)}>
                  <StyledButtonText selected={selectedCategories.includes(7)}>스피치/리스닝</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(8)} onClick={() => handleCategoryClick(8)}>
                  <StyledButtonText selected={selectedCategories.includes(8)}>취미</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(9)} onClick={() => handleCategoryClick(9)}>
                  <StyledButtonText selected={selectedCategories.includes(9)}>공연/이벤트</StyledButtonText>
                </StyledButtonWrapper>
                <StyledButtonWrapper selected={selectedCategories.includes(10)} onClick={() => handleCategoryClick(10)}>
                  <StyledButtonText selected={selectedCategories.includes(10)}>유아</StyledButtonText>
                </StyledButtonWrapper>
              </ButtonGroup>
            </div>
          </InputContainer>
        </Section>

        <JoinButtonContainer>
          <Button type="submit" text="가입하기" />
        </JoinButtonContainer>
      </form>
    </Container>
  );
};

export default JoinForm;

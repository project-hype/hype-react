import styled from 'styled-components';

// 회원가입 폼 컨테이너
export const Container = styled.div`
  position: relative;
  width: 50%;
  background-color: #fff;
  padding-top: 16px;
  margin: 0 auto;
`;

// 필수 입력 필드 안내 부분
export const NoticeSection = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  margin-bottom: 8px;
`;

// 입력 폼 부분
export const InputSection = styled.div`
  margin-bottom: 32px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 48px;
  border: none;
`;

export const InputField = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  font-family: '해피니스 산스 레귤러';
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

export const LabelContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Label = styled.div`
  font-family: '해피니스 산스 타이틀';
  font-weight: bold;
  font-size: 20px;
  color: #595959;
`;

export const Asterisk = styled.span`
  color: #f00;
`;

export const SelectField = styled.select`
  width: 30%;
  padding: 10px;
  font-family: '해피니스 산스 볼드';
  font-size: 16px;
  border: 1px solid #e0ded8;
  border-radius: 20px;
  margin-bottom: 8px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-family: '해피니스 산스 레귤러';
  font-size: 16px;
  color: #595959;
`;

export const RadioButtonInput = styled.input`
  margin-right: 5px;
`;

export const ButtonContainer = styled.div`
  margin-top: 56px;
  margin-bottom: 56px;
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export const ErrorText = styled.div`
  font-family: '해피니스 산스 레귤러';
  font-weight: bold;
  font-size: 11px;
  color: #f00;
  margin-top: 8px;
`;

// 버튼 스타일
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledButtonWrapper = styled.div`
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
  width: 128px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '1px solid #ff8c00;' : '1px solid #E0DED8')}; /* 선택됐을 때의 테두리 색상 */
  margin-top: 16px;
  margin-right: 40px;
`;

export const StyledButtonText = styled.div`
  color: ${(props) => (props.selected ? '#fff' : '#1E1E1E')};
  font-family: '해피니스 산스 타이틀';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
`;

export const DescriptionText = styled.span`
  color: #000;
`;

export const CheckButton = styled.button`
  margin-left: 8px;
  padding: 10px;
  width: 112px;
  height: 43px;
  font-family: '해피니스 산스 레귤러';
  font-size: 14px;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  background-color: #ff8c00;
  cursor: pointer;
  &:hover {
    background-color: #1e9d8b;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e0ded8;
  margin-top: 4px;
  margin-bottom: 16px; /* 구분선 아래에 여백 추가 */
`;

export const PageTitle = styled.div`
  color: #1e1e1e;
  font-family: '해피니스 산스 타이틀';
  font-size: 40px;
  text-align: center;
  margin: 48px;
`;
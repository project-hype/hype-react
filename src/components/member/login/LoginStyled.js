import styled from 'styled-components';

/**
 * 로그인 스타일드 컴포넌트
 * @author 임원정
 * @since 2024.06.30
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.30   임원정        최초 생성
 * </pre>
 */

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh; // 전체 화면 높이
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const HypeLogo = styled.img`
  width: 320px;
  height: auto;
  cursor: pointer;
  margin-bottom: 24px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  color: #595959;
  font-family: '해피니스 산스 타이틀';
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #595959;
  border-radius: 20px;
  height: 54px;
  width: 501px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  border: none;
  width: 90%;
  height: 50%;
  font-size: 16px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 501px; /* FormContainer와 같은 너비 */
  margin-bottom: 20px;
`;

export const SignUpPrompt = styled.div`
  color: #595959;
  font-family: '해피니스 산스 타이틀';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

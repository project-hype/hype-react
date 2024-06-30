import styled from 'styled-components';

/**
 * 관리자 페이지 - common styled 컴포넌트
 * @author 조영욱
 * @since 2024.06.30
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.30  	조영욱        최초 생성
 * </pre>
 */
export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const Header = styled.header`
  background-color: #f0f5f4;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Gray border color */
  height: 49px;
`;

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')}; /* Gray border color */
`;

export const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  text-align: center;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box; /* Padding and border included in the element's total width and height */
`;

export const Title = styled.div`
  color: #1e1e1e;
  font-family: '해피니스 산스 타이틀';
  font-size: 32px;
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SaveButton = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

export const CancelButton = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #dc3545; /* Red background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

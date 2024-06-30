import styled from 'styled-components';

/**
 * 필터 버튼
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * </pre>
 */

export const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? '#ff8c00' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#000')};
  border: ${(props) => (props.active ? 'none' : '1px solid gray')};
  margin-left: 20px;
  width: 112px;
  height: 43px;
  font-family: '해피니스 산스 레귤러';
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? '#ff8c00' : '#eee')};
    color: ${(props) => (props.active ? 'white' : '#000000')};
    border: ${(props) => (props.active ? 'none' : '1px solid #ccc')};
  }
`;

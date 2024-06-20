import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 50%;
  background-color: #fff;
  padding-top: 16px;
  margin: 0 auto;
`;

export const NoticeSection = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  margin-bottom: 8px;
`;

export const InputSection = styled.div`
  margin-bottom: 32px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 48px;
  border: none;
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

export const ErrorText = styled.div`
  font-family: '해피니스 산스 레귤러';
  font-weight: bold;
  font-size: 11px;
  color: #f00;
  margin-top: 8px;
`;

export const JoinButtonContainer = styled.div`
  margin-top: 56px;
  margin-bottom: 56px;
  display: flex;
  justify-content: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
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
  width: 107px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '1px solid #ff8c00;' : '1px solid #E0DED8')};
  margin-top: 16px;
  margin-right: 40px;
`;

export const StyledButtonText = styled.div`
  color: ${(props) => (props.selected ? '#fff' : '#1E1E1E')};
  font-family: '해피니스 산스 타이틀';
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
`;

export const DescriptionText = styled.span`
  color: #000;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e0ded8;
  margin-top: 4px;
  margin-bottom: 16px;
`;

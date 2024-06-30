import React from 'react';
import styled from 'styled-components';
import AdminAPI from '../../../api/admin/adminAPI';

/**
 * 관리자 페이지 - 행사 관리 테이블 로우
 * @author 조영욱
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const EventRow = ({ event, onRowClick }) => {
  const handleClick = async () => {
    try {
      const response = await AdminAPI.getEventDetail(event.eventId);
      const eventData = response.data;
      onRowClick(eventData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row onClick={handleClick}>
      <Cell width="80px">
        <TextWrapper>{event.eventId}</TextWrapper>
      </Cell>
      <Cell width="100px" hasBorder>
        <TextWrapper>{event.eventTypeName}</TextWrapper>
      </Cell>
      <Cell width="416px" hasBorder>
        <TextWrapper>{event.title}</TextWrapper>
      </Cell>
      <Cell width="164px" hasBorder>
        <TextWrapper>{event.startDate.split(' ')[0]}</TextWrapper>
      </Cell>
      <Cell width="164px" hasBorder>
        <TextWrapper>{event.endDate.split(' ')[0]}</TextWrapper>
      </Cell>
    </Row>
  );
};

export default EventRow;

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')};
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

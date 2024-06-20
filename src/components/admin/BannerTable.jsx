import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Styled Components
const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #f0f5f4;
  width: 800px;
`;

const RowContainer = styled.div`
  width: 800px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc; /* 회색 테두리 색상 */
  height: 49px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align || 'center'};
  height: 100%;
  width: ${(props) => props.width || '150px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')}; /* 회색 테두리 색상 */
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  width: 120px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #dc3545; /* 빨간색 배경 */
  color: white; /* 흰색 텍스트 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 4px; /* 둥근 모서리 */
`;

const AddButton = styled.button`
  width: 160px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff; /* 파란색 배경 */
  color: white; /* 흰색 텍스트 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 4px; /* 둥근 모서리 */
`;

const ApplyButton = styled.button`
  width: 160px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff; /* 파란색 배경 */
  color: white; /* 흰색 텍스트 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 4px; /* 둥근 모서리 */
`;

// Component
const BannerTable = () => {
  const [bannerList, setBannerList] = useState([]);
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [isApplyButtonVisible, setIsApplyButtonVisible] = useState(false);

  useEffect(() => {
    fetchBannerList(); // 컴포넌트가 마운트될 때 배너 리스트 가져오기
  }, []);

  const fetchBannerList = () => {
    axios
      .get('http://localhost:8080/event/list/banner')
      .then((response) => {
        // 데이터를 성공적으로 받아왔을 때
        console.log(response.data); // 받아온 데이터 확인 (개발 중에 유용함)
        // 데이터를 업데이트하고 orderPriority 기준으로 정렬
        const sortedBannerList = response.data.eventList.sort((a, b) => a.orderPriority - b.orderPriority);
        setBannerList(sortedBannerList);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error fetching banner list:', error);
      });
  };

  const handleAddBanner = () => {
    axios
      .post('http://localhost:8080/event/add/banner', {
        title: newBannerTitle,
        orderPriority: bannerList.length + 1, // 현재 배너 개수보다 1 큰 우선순위로 설정
      })
      .then((response) => {
        fetchBannerList(); // 데이터 다시 불러오기
        setNewBannerTitle(''); // 입력 필드 초기화
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error adding new banner:', error);
      });
  };

  const handleDeleteBanner = (eventId) => {
    axios
      .delete(`http://localhost:8080/event/delete/banner/${eventId}`)
      .then((response) => {
        fetchBannerList(); // 데이터 다시 불러오기
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error(`Error deleting banner with ID ${eventId}:`, error);
      });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(bannerList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedList = items.map((item, index) => ({
      ...item,
      orderPriority: index + 1, // 순서 업데이트
    }));

    setBannerList(updatedList);
    setIsApplyButtonVisible(true); // 정렬 적용 버튼을 보이게 설정
  };

  const applyOrderChanges = () => {
    axios
      .post('http://localhost:8080/admin/event/banner/order', {
        eventList: bannerList.map((banner) => ({
          eventId: banner.eventId,
          orderPriority: banner.orderPriority,
        })),
      })
      .then((response) => {
        setIsApplyButtonVisible(false); // 정렬 적용 버튼 감추기
        fetchBannerList(); // 데이터 다시 불러오기
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error applying banner order:', error);
      });
  };

  return (
    <BannerWrapper>
      <Header>
        <HeaderRow>
          <HeaderCell width="100px">
            <TextWrapper>행사 번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="300px">
            <TextWrapper>행사 제목</TextWrapper>
          </HeaderCell>
          <HeaderCell width="100px">
            <TextWrapper>정렬 순서</TextWrapper>
          </HeaderCell>
          <HeaderCell width="100px" align="left" hasBorder>
            <TextWrapper>삭제</TextWrapper>
          </HeaderCell>
        </HeaderRow>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <RowContainer {...provided.droppableProps} ref={provided.innerRef}>
              {bannerList.map((banner, index) => (
                <Draggable key={banner.eventId} draggableId={banner.eventId.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <HeaderRow>
                        <HeaderCell width="100px">
                          <TextWrapper>{banner.eventId}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="300px">
                          <TextWrapper>{banner.title}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="100px">
                          <TextWrapper>{banner.orderPriority}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="100px" align="left" hasBorder>
                          <DeleteButton onClick={() => handleDeleteBanner(banner.eventId)}>삭제</DeleteButton>
                        </HeaderCell>
                      </HeaderRow>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </RowContainer>
          )}
        </Droppable>
      </DragDropContext>
      {isApplyButtonVisible && <ApplyButton onClick={applyOrderChanges}>정렬 적용</ApplyButton>}
      <AddButton onClick={handleAddBanner}>새 배너 추가</AddButton>
    </BannerWrapper>
  );
};

export default BannerTable;

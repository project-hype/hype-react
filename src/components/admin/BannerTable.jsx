import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddButton from '../common/AddButton';
import AddBannerModal from './AddBannerModal';

// Styled Components
const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #f0f5f4;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 49px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align || 'center'};
  height: 100%;
  width: ${(props) => props.width || '150px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')};
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
  font-family: '해피니스 산스 볼드', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: #eaeaea;
  }
`;

const ApplyButton = styled.button`
  width: 160px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: '해피니스 산스 볼드', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #1e9d8b;
  color: white;
  border: none;
  border-radius: 10px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Title = styled.div`
  color: #1e1e1e;
  font-family: '해피니스 산스 타이틀';
  font-size: 32px;
  text-align: center;
  margin-bottom: 24px;
`;

const BannerTable = () => {
  const [bannerList, setBannerList] = useState([]);
  const [isApplyButtonVisible, setIsApplyButtonVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchBannerList();
  }, []);

  // Fetch banner list from the server
  const fetchBannerList = () => {
    axios
      .get('http://localhost:8080/event/list/banner')
      .then((response) => {
        const sortedBannerList = response.data.eventList.sort((a, b) => a.orderPriority - b.orderPriority);
        setBannerList(sortedBannerList);
      })
      .catch((error) => {
        console.error('Failed to fetch banner list:', error);
      });
  };

  // Handle adding a new banner
  const handleAddBanner = (eventId, orderPriority) => {
    axios
      .post('http://localhost:8080/admin/event/banner', {
        eventId: eventId,
        orderPriority: orderPriority,
      })
      .then((response) => {
        fetchBannerList(); // Refresh banner list
        setShowModal(false); // Close modal after adding
      })
      .catch((error) => {
        console.error('Failed to add new banner:', error);
      });
  };

  // Handle deleting a banner
  const handleDeleteBanner = (eventId) => {
    axios
      .delete(`http://localhost:8080/admin/event/banner/${eventId}`)
      .then((response) => {
        fetchBannerList(); // Refresh banner list
      })
      .catch((error) => {
        console.error(`Failed to delete banner with ID ${eventId}:`, error);
      });
  };

  // Handle drag and drop end event
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(bannerList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedList = items.map((item, index) => ({
      ...item,
      orderPriority: index + 1,
    }));

    setBannerList(updatedList);
    setIsApplyButtonVisible(true); // Show apply button after reordering
  };

  // Handle applying order changes
  const applyOrderChanges = () => {
    axios
      .put('http://localhost:8080/admin/event/banner/order', {
        bannerList: bannerList.map((banner) => ({
          eventId: banner.eventId,
          orderPriority: banner.orderPriority,
        })),
      })
      .then((response) => {
        setIsApplyButtonVisible(false); // Hide apply button after applying changes
        fetchBannerList(); // Refresh banner list
      })
      .catch((error) => {
        console.error('Failed to apply banner order changes:', error);
      });
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle event selection in the modal
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    handleAddBanner(event.eventId, bannerList.length + 1); // Add new banner with the next order priority
  };

  // Close modal
  const handleCancelModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  return (
    <BannerWrapper>
      <Title>배너 관리</Title>
      <p>드래그 앤 드랍으로 배너 노출 순서를 변경하실 수 있습니다</p>
      <Header>
        <HeaderRow>
          <HeaderCell width="100px">
            <TextWrapper>노출 순서</TextWrapper>
          </HeaderCell>
          <HeaderCell width="100px" hasBorder>
            <TextWrapper>행사 번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="500px" hasBorder>
            <TextWrapper>행사 제목</TextWrapper>
          </HeaderCell>
          <HeaderCell width="150px" hasBorder>
            <TextWrapper>배너에서 제외</TextWrapper>
          </HeaderCell>
        </HeaderRow>
      </Header>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {bannerList.map((banner, index) => (
                <Draggable key={banner.eventId.toString()} draggableId={banner.eventId.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <HeaderRow>
                        <HeaderCell width="100px">
                          <TextWrapper>{banner.orderPriority}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="100px" hasBorder>
                          <TextWrapper>{banner.eventId}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="500px" hasBorder>
                          <TextWrapper>{banner.title}</TextWrapper>
                        </HeaderCell>
                        <HeaderCell width="150px" hasBorder>
                          <DeleteButton onClick={() => handleDeleteBanner(banner.eventId)}>제외</DeleteButton>
                        </HeaderCell>
                      </HeaderRow>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isApplyButtonVisible && <ApplyButton onClick={applyOrderChanges}>정렬 적용</ApplyButton>}

      <AddButton onClick={toggleModal} domain="배너 " />

      {showModal && (
        <>
          <Backdrop onClick={handleCancelModal} />
          <AddBannerModal onClose={handleCancelModal} onEventSelect={handleEventSelect} />
        </>
      )}
    </BannerWrapper>
  );
};

export default BannerTable;

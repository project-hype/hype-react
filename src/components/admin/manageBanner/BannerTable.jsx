import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddButton from '../../common/AddButton';
import AddBannerModal from './AddBannerModal';
import AdminAPI from '../../../api/admin/adminAPI';
import { TableWrapper, Header, HeaderRow, HeaderCell, TextWrapper, Title } from '../common/styled';

/**
 * 관리자 페이지 - 배너 관리 테이블
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * 2024.06.23   임원정        Admin 페이지 디자인수정
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
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
    AdminAPI.getBanner()
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
    AdminAPI.createBanner({
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
    AdminAPI.deleteBanner(eventId)
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
    AdminAPI.applyOrderChange({
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
    <TableWrapper>
      <Title>배너 관리</Title>
      {/* <p>드래그 앤 드랍으로 배너 노출 순서를 변경하실 수 있습니다 </p> */}

      <AddButton onClick={toggleModal} domain="배너 " />
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

      {showModal && (
        <>
          <Backdrop onClick={handleCancelModal} />
          <AddBannerModal onClose={handleCancelModal} onEventSelect={handleEventSelect} />
        </>
      )}
    </TableWrapper>
  );
};

export default BannerTable;

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

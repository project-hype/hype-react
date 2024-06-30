import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConfirmDelete from '../ConfirmDelete';
import AdminAPI from '../../../api/admin/adminAPI';

/**
 * 관리자 페이지 - 행사 수정 모달창
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const EventEditModal = ({ event, onClose, onSave, onDelete }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [eventTypes, setEventTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [hashtagList, setHashtagList] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [addHashtagOptions, setAddHashtagOptions] = useState([]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await AdminAPI.getEventTypeList();
        setEventTypes(response.data.eventTypeList);
      } catch (error) {
        console.error('Failed to fetch event types', error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await AdminAPI.getBranchList();
        setBranches(response.data.branchList);
      } catch (error) {
        console.error('Failed to fetch branches', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await AdminAPI.getCategoryList();
        setCategories(response.data.categoryList);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchHashtags = async () => {
      try {
        const response = await AdminAPI.getEventHashtagList(event.eventId);
        setHashtagList(response.data.eventHashtagList);
      } catch (error) {
        console.error('Failed to fetch hashtags', error);
      }
    };

    const fetchHashtagOptions = async () => {
      try {
        const response = await AdminAPI.getHashtagList();
        setAddHashtagOptions(response.data.hashtagList);
      } catch (error) {
        console.error('Failed to fetch hashtag options', error);
      }
    };

    fetchEventTypes();
    fetchBranches();
    fetchCategories();
    fetchHashtags();
    fetchHashtagOptions();
  }, [event.eventId]);

  useEffect(() => {
    if (event.startDate) {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        startDate: formatDateString(event.startDate),
      }));
    }
    if (event.endDate) {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        endDate: formatDateString(event.endDate),
      }));
    }
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      eventTypeId: event.eventTypeId || '',
      branchId: event.branchId || '',
      categoryId: event.categoryId || '',
      imageUrl: event.imageUrl,
    }));
    setImagePreview(event.imageUrl);
    setSelectedHashtags(event.hashtags || []);
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedEvent({
          ...editedEvent,
          image: file,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      const jsonRequest = JSON.stringify({
        eventId: editedEvent.eventId,
        eventTypeId: editedEvent.eventTypeId,
        branchId: editedEvent.branchId,
        categoryId: editedEvent.categoryId,
        title: editedEvent.title,
        content: editedEvent.content,
        startDate: editedEvent.startDate,
        endDate: editedEvent.endDate,
        detailAddress: editedEvent.detailAddress,
        imageUrl: editedEvent.imageUrl,
        hashtags: selectedHashtags.map((hashtag) => hashtag.hashtagId),
      });
      formData.append('request', new Blob([jsonRequest], { type: 'application/json' }));

      if (editedEvent.image) {
        formData.append('file', editedEvent.image);
      }

      const response = await AdminAPI.modifyEvent(formData);

      if (response.status === 200) {
        onSave(editedEvent);
        onClose();
      } else {
        console.error('Failed to save the event');
      }
    } catch (error) {
      console.error('Failed to save the event', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await AdminAPI.deleteEvent(editedEvent.eventId);
      if (response.status === 200) {
        onDelete(editedEvent.eventId);
        onClose();
      } else {
        console.error('Failed to delete the event');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleHashtagClick = async (hashtag) => {
    try {
      const response = await AdminAPI.deleteEventHashtag(editedEvent.eventId, hashtag.hashtagId);

      if (response.status === 200) {
        const response = await AdminAPI.getEventHashtagList(event.eventId);
        setHashtagList(response.data.eventHashtagList);
      }
    } catch (error) {
      console.error('Failed to add hashtag to event', error);
    }
  };

  const handleRemoveHashtag = async (hashtagId) => {
    try {
      const response = await AdminAPI.deleteEventHashtag(editedEvent.eventId, hashtagId);

      if (response.status === 200) {
        const response = await AdminAPI.getEventHashtagList(event.eventId);
        setHashtagList(response.data.eventHashtagList);
      }
    } catch (error) {
      console.error('Failed to remove hashtag from event', error);
    }
  };

  const handleAddHashtag = async (e) => {
    const selectedHashtagId = e.target.value;
    try {
      const response = await AdminAPI.createEventHashtag({
        eventId: editedEvent.eventId,
        hashtagId: selectedHashtagId,
      });

      if (response.status === 200) {
        const response = await AdminAPI.getEventHashtagList(event.eventId);
        setHashtagList(response.data.eventHashtagList);
      }
    } catch (error) {
      console.error('Failed to add hashtag to event', error);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>행사 수정</h2>

        <FormField>
          <label>이미지</label>
          {imagePreview && <ImagePreview src={imagePreview} alt="이미지 미리 보기" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </FormField>
        <FormField>
          <label>제목</label>
          <input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>행사 타입</label>
          <CustomSelect name="eventTypeId" value={editedEvent.eventTypeId} onChange={handleInputChange}>
            {eventTypes.map((type) => (
              <option key={type.eventTypeId} value={type.eventTypeId}>
                {type.eventTypeName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <FormField>
          <label>지점</label>
          <CustomSelect name="branchId" value={editedEvent.branchId} onChange={handleInputChange}>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <FormField>
          <label>카테고리</label>
          <CustomSelect name="categoryId" value={editedEvent.categoryId} onChange={handleInputChange}>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <HashtagAddContainer>
          <label>추가할 해시태그</label>
          <HashtagAddSelect onChange={handleAddHashtag}>
            <option value="">선택하세요</option>
            {addHashtagOptions.map((hashtag) => (
              <option key={hashtag.hashtagId} value={hashtag.hashtagId}>
                {hashtag.hashtagName}
              </option>
            ))}
          </HashtagAddSelect>
        </HashtagAddContainer>
        <FormField>
          <label>현재 해시태그</label>
          <HashtagContainer>
            <HashtagList>
              {hashtagList.map((hashtag) => (
                <HashtagItem key={hashtag.hashtagId} onClick={() => handleHashtagClick(hashtag)}>
                  #{hashtag.hashtagName}
                </HashtagItem>
              ))}
            </HashtagList>
          </HashtagContainer>
        </FormField>

        <FormField>
          <label>시작 날짜</label>
          <input type="date" name="startDate" value={editedEvent.startDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>종료 날짜</label>
          <input type="date" name="endDate" value={editedEvent.endDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>상세 주소</label>
          <textarea name="detailAddress" value={editedEvent.detailAddress} onChange={handleInputChange} />
        </FormField>

        <ButtonContainer>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={() => setShowConfirmDelete(true)}>삭제</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>

        {/* ConfirmDelete 모달 */}
        {showConfirmDelete && (
          <ConfirmDelete
            isOpen={showConfirmDelete}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmDelete(false)}
          />
        )}

        {/* 출력 현재 이벤트의 해시태그 목록 */}
        {editedEvent.hashtags && (
          <FormField>
            <label>현재 해시태그</label>
            <HashtagList>
              {editedEvent.hashtags.map((hashtag) => (
                <HashtagItem key={hashtag.hashtagId} onClick={() => handleRemoveHashtag(hashtag.hashtagId)}>
                  #{hashtag.hashtagName}
                </HashtagItem>
              ))}
            </HashtagList>
          </FormField>
        )}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventEditModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 60%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
`;

const FormField = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    height: 120px;
    resize: vertical;
  }
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0070b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #0070b3;
  color: white;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
`;

const HashtagContainer = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const HashtagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HashtagItem = styled.div`
  background-color: #f0f0f0;
  color: #333;
  padding: 6px 12px;
  border-radius: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const HashtagAddContainer = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const HashtagAddSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0070b3;
  }
`;

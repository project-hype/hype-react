import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  max-height: 80vh; /* 최대 높이 설정 */
  overflow-y: auto; /* Y축 스크롤 설정 */
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
    height: 120px; /* Increase height for larger textarea */
    resize: vertical; /* Allow vertical resizing */
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

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EventEditModal = ({ event, onClose, onSave }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [eventTypes, setEventTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리 보기 상태

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/event/type/list');
        setEventTypes(response.data.eventTypeList);
      } catch (error) {
        console.error('Failed to fetch event types', error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/event/branch/list');
        setBranches(response.data.branchList);
      } catch (error) {
        console.error('Failed to fetch branches', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/event/category/list');
        setCategories(response.data.categoryList);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchEventTypes();
    fetchBranches();
    fetchCategories();
  }, []);

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
    setImagePreview(event.imageUrl); // 기존 이미지 미리 보기 설정
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
          image: file, // 이미지 파일 설정
        });
        setImagePreview(reader.result); // 이미지 미리 보기 설정
      };
      reader.readAsDataURL(file); // FileReader를 사용하여 이미지 파일을 읽어옴
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // JSON 데이터를 문자열로 변환
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
      });
      formData.append('request', new Blob([jsonRequest], { type: 'application/json' }));
      console.log(editedEvent.image);
      if (editedEvent.image || editedEvent.image !== 'undefined') {
        formData.append('file', editedEvent.image); // 이미지 파일
      }

      const response = await axios.put('http://localhost:8080/admin/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

        <FormField>
          <label>내용</label>
          <textarea name="content" value={editedEvent.content} onChange={handleInputChange} rows={5} />
        </FormField>
        <FormField>
          <label>시작일</label>
          <input type="date" name="startDate" value={editedEvent.startDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>종료일</label>
          <input type="date" name="endDate" value={editedEvent.endDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>상세 위치</label>
          <input type="text" name="detailAddress" value={editedEvent.detailAddress} onChange={handleInputChange} />
        </FormField>
        <ButtonContainer>
          <Button onClick={handleSave}>수정</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventEditModal;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminAPI from '../../../api/admin/adminAPI';

/**
 * 관리자 페이지 - 행사 추가 모달창
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
const EventAddModal = ({ onClose, onSave }) => {
  const [newEvent, setNewEvent] = useState({
    eventTypeId: '',
    branchId: '',
    categoryId: '',
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    detailAddress: '',
    imageUrl: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await AdminAPI.getEventList();
        setEventTypes(response.data.eventTypeList);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await AdminAPI.getBranchList();
        setBranches(response.data.branchList);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await AdminAPI.getCategoryList();
        setCategories(response.data.categoryList);
      } catch (e) {
        console.error(e);
      }
    };

    fetchEventTypes();
    fetchBranches();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({
          ...newEvent,
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
        eventTypeId: newEvent.eventTypeId,
        branchId: newEvent.branchId,
        categoryId: newEvent.categoryId,
        title: newEvent.title,
        content: newEvent.content,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        detailAddress: newEvent.detailAddress,
      });
      formData.append('request', new Blob([jsonRequest], { type: 'application/json' }));
      formData.append('file', newEvent.image); // 이미지 파일 추가

      const response = await AdminAPI.createEvent(formData);
      if (response.status === 200) {
        onSave(newEvent);
        onClose();
      } else {
        console.error('Failed to save the event');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>행사 추가</h2>
        <FormField>
          <label>이미지</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <ImagePreview src={imagePreview} alt="이미지 미리 보기" />}
        </FormField>
        <FormField>
          <label>제목</label>
          <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>행사 타입</label>
          <CustomSelect name="eventTypeId" value={newEvent.eventTypeId} onChange={handleInputChange}>
            <option value="">--선택하세요--</option>
            {eventTypes.map((type) => (
              <option key={type.eventTypeId} value={type.eventTypeId}>
                {type.eventTypeName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <FormField>
          <label>지점</label>
          <CustomSelect name="branchId" value={newEvent.branchId} onChange={handleInputChange}>
            <option value="">--선택하세요--</option>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <FormField>
          <label>카테고리</label>
          <CustomSelect name="categoryId" value={newEvent.categoryId} onChange={handleInputChange}>
            <option value="">--선택하세요--</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </CustomSelect>
        </FormField>
        <FormField>
          <label>내용</label>
          <textarea name="content" value={newEvent.content} onChange={handleInputChange} rows={5} />
        </FormField>
        <FormField>
          <label>시작일</label>
          <input type="date" name="startDate" value={newEvent.startDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>종료일</label>
          <input type="date" name="endDate" value={newEvent.endDate} onChange={handleInputChange} />
        </FormField>
        <FormField>
          <label>상세 위치</label>
          <input type="text" name="detailAddress" value={newEvent.detailAddress} onChange={handleInputChange} />
        </FormField>
        <ButtonContainer>
          <Button onClick={handleSave}>추가</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventAddModal;

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

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
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

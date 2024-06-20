import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddCategoryModal from './AddCategoryModal';
import ConfirmDelete from './ConfirmDelete';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
import CancelButton from '../common/CancleButton';
import AddButton from '../common/AddButton';
import SaveButton from '../common/SaveButton';

// Styled Components
const CategoryWrapper = styled.div`
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
  border-bottom: 1px solid #ccc; /* Gray border color */
  height: 49px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => props.width || '95px'};
  border-left: ${(props) => (props.hasBorder ? '1px solid #ccc' : 'none')}; /* Gray border color */
`;

const TextWrapper = styled.div`
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  text-align: center;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box; /* Padding and border included in the element's total width and height */
`;

// Component
const CategoryTable = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져오기
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/admin/event/category/list')
      .then((response) => {
        // 데이터를 성공적으로 받아왔을 때
        console.log(response.data); // 받아온 데이터 확인 (개발 중에 유용함)
        // 데이터를 업데이트
        setCategoryData(response.data.categoryList);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error fetching category data:', error);
      });
  };

  const handleEditClick = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
  };

  const handleInputChange = (e) => {
    setEditCategoryName(e.target.value);
  };

  const handleSaveClick = () => {
    axios
      .put('http://localhost:8080/admin/event/category', {
        categoryId: editCategoryId,
        categoryName: editCategoryName,
      })
      .then((response) => {
        // 데이터를 성공적으로 업데이트했을 때
        console.log(response.data);
        const updatedData = categoryData.map((category) =>
          category.categoryId === editCategoryId ? { ...category, categoryName: editCategoryName } : category,
        );
        setCategoryData(updatedData);
        setEditCategoryId(null); // 수정 모드 종료
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error updating category data:', error);
      });
  };

  const handleCancelClick = () => {
    setEditCategoryId(null);
    setEditCategoryName('');
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewCategoryName('');
  };

  const handleAddCategory = () => {
    axios
      .post('http://localhost:8080/admin/event/category', {
        categoryName: newCategoryName,
      })
      .then((response) => {
        fetchData();
        setIsAddModalOpen(false);
        setNewCategoryName('');
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error adding category:', error);
      });
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    axios
      .delete(`http://localhost:8080/admin/event/category/${categoryToDelete.categoryId}`)
      .then((response) => {
        // 데이터를 성공적으로 삭제했을 때
        console.log(response.data);
        const updatedData = categoryData.filter((category) => category.categoryId !== categoryToDelete.categoryId);
        setCategoryData(updatedData);
        setCategoryToDelete(null);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error deleting category data:', error);
      });
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <CategoryWrapper>
      <Header>
        <HeaderRow>
          <HeaderCell width="160px">
            <TextWrapper>카테고리번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="416px" hasBorder>
            <TextWrapper>카테고리이름</TextWrapper>
          </HeaderCell>
          <HeaderCell width="180px" hasBorder>
            <TextWrapper>수정</TextWrapper>
          </HeaderCell>
          <HeaderCell width="120px" hasBorder>
            <TextWrapper>삭제</TextWrapper>
          </HeaderCell>
        </HeaderRow>
      </Header>
      <div>
        {categoryData.map((category) => (
          <HeaderRow key={category.categoryId}>
            <HeaderCell width="160px">
              <TextWrapper>{category.categoryId}</TextWrapper>
            </HeaderCell>
            <HeaderCell width="416px" hasBorder>
              {editCategoryId === category.categoryId ? (
                <Input type="text" value={editCategoryName} onChange={handleInputChange} />
              ) : (
                <TextWrapper>{category.categoryName}</TextWrapper>
              )}
            </HeaderCell>
            <HeaderCell width="180px" hasBorder>
              {editCategoryId === category.categoryId ? (
                <>
                  <SaveButton onClick={handleSaveClick} />
                  <CancelButton onClick={handleCancelClick} />
                </>
              ) : (
                <EditButton onClick={() => handleEditClick(category.categoryId, category.categoryName)} />
              )}
            </HeaderCell>
            <HeaderCell width="120px" hasBorder>
              <DeleteButton onClick={() => handleDeleteClick(category)} />
            </HeaderCell>
          </HeaderRow>
        ))}
      </div>
      <AddButton onClick={handleAddClick} domain="카테고리" />
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={(value) => setNewCategoryName(value)}
      />
      <ConfirmDelete isOpen={isDeleteModalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </CategoryWrapper>
  );
};

export default CategoryTable;

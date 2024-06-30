import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddCategoryModal from './AddCategoryModal';
import ConfirmDelete from '../ConfirmDelete';
import DeleteButton from '../../common/DeleteButton';
import EditButton from '../../common/EditButton';
import CancelButton from '../../common/CancleButton';
import AddButton from '../../common/AddButton';
import SaveButton from '../../common/SaveButton';
import AdminAPI from '../../../api/admin/adminAPI';
import { TableWrapper, Header, HeaderRow, HeaderCell, TextWrapper, Input, Title } from '../common/styled';

/**
 * 관리자 페이지 - 카테고리 관리 테이블
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
    AdminAPI.getCategoryList()
      .then((response) => {
        setCategoryData(response.data.categoryList);
      })
      .catch((e) => {
        console.error(e);
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
    AdminAPI.modifyCategory({
      categoryId: editCategoryId,
      categoryName: editCategoryName,
    })
      .then((response) => {
        const updatedData = categoryData.map((category) =>
          category.categoryId === editCategoryId ? { ...category, categoryName: editCategoryName } : category,
        );
        setCategoryData(updatedData);
        setEditCategoryId(null);
      })
      .catch((e) => {
        console.error(e);
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
    AdminAPI.createCategory({
      categoryName: newCategoryName,
    })
      .then((response) => {
        fetchData();
        setIsAddModalOpen(false);
        setNewCategoryName('');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    AdminAPI.deleteCategory(categoryToDelete.categoryId)
      .then((response) => {
        const updatedData = categoryData.filter((category) => category.categoryId !== categoryToDelete.categoryId);
        setCategoryData(updatedData);
        setCategoryToDelete(null);
        setIsDeleteModalOpen(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <TableWrapper>
      <Title>카테고리 관리</Title>
      <AddButton onClick={handleAddClick} domain="카테고리" />
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

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={(value) => setNewCategoryName(value)}
      />
      <ConfirmDelete isOpen={isDeleteModalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </TableWrapper>
  );
};

export default CategoryTable;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddHashtagModal from './AddHashtagModal';
import ConfirmDelete from '../ConfirmDelete';
import DeleteButton from '../../common/DeleteButton';
import EditButton from '../../common/EditButton';
import CancelButton from '../../common/CancleButton';
import AddButton from '../../common/AddButton';
import SaveButton from '../../common/SaveButton';
import AdminAPI from '../../../api/admin/adminAPI';
import { TableWrapper } from '../common/styled';

/**
 * 관리자 페이지 - 해시태그 관리 테이블
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
const HashtagTable = () => {
  const [hashtagData, setHashtagData] = useState([]);
  const [editHashtagId, setEditHashtagId] = useState(null);
  const [editHashtagName, setEditHashtagName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHashtagName, setNewHashtagName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hashtagToDelete, setHashtagToDelete] = useState(null);

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져오기
  }, []);

  const fetchData = () => {
    AdminAPI.getHashtagList()
      .then((response) => {
        setHashtagData(response.data.hashtagList);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleEditClick = (hashtagId, hashtagName) => {
    setEditHashtagId(hashtagId);
    setEditHashtagName(hashtagName);
  };

  const handleInputChange = (e) => {
    setEditHashtagName(e.target.value);
  };

  const handleSaveClick = () => {
    AdminAPI.modifyHashtag({
      hashtagId: editHashtagId,
      hashtagName: editHashtagName,
    })
      .then((response) => {
        const updatedData = hashtagData.map((hashtag) =>
          hashtag.hashtagId === editHashtagId ? { ...hashtag, hashtagName: editHashtagName } : hashtag,
        );
        setHashtagData(updatedData);
        setEditHashtagId(null);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCancelClick = () => {
    setEditHashtagId(null);
    setEditHashtagName('');
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewHashtagName('');
  };

  const handleAddHashtag = () => {
    AdminAPI.createHashtag({
      hashtagName: newHashtagName,
    })
      .then((response) => {
        fetchData();
        setIsAddModalOpen(false);
        setNewHashtagName('');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteClick = (hashtag) => {
    setHashtagToDelete(hashtag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!hashtagToDelete) return;

    AdminAPI.deleteHashtag(hashtagToDelete.hashtagId)
      .then((response) => {
        const updatedData = hashtagData.filter((hashtag) => hashtag.hashtagId !== hashtagToDelete.hashtagId);
        setHashtagData(updatedData);
        setHashtagToDelete(null);
        setIsDeleteModalOpen(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCancelDelete = () => {
    setHashtagToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <TableWrapper>
      <Title>해시태그 관리</Title>
      <AddButton onClick={handleAddClick} domain="해시태그" />
      <Header>
        <HeaderRow>
          <HeaderCell width="160px">
            <TextWrapper>해시태그 번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="416px" hasBorder>
            <TextWrapper>해시태그 이름</TextWrapper>
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
        {hashtagData.map((hashtag) => (
          <HeaderRow key={hashtag.hashtagId}>
            <HeaderCell width="160px">
              <TextWrapper>{hashtag.hashtagId}</TextWrapper>
            </HeaderCell>
            <HeaderCell width="416px" hasBorder>
              {editHashtagId === hashtag.hashtagId ? (
                <Input type="text" value={editHashtagName} onChange={handleInputChange} />
              ) : (
                <TextWrapper>{hashtag.hashtagName}</TextWrapper>
              )}
            </HeaderCell>
            <HeaderCell width="180px" hasBorder>
              {editHashtagId === hashtag.hashtagId ? (
                <>
                  <SaveButton onClick={handleSaveClick} />
                  <CancelButton onClick={handleCancelClick} />
                </>
              ) : (
                <EditButton onClick={() => handleEditClick(hashtag.hashtagId, hashtag.hashtagName)} />
              )}
            </HeaderCell>
            <HeaderCell width="120px" hasBorder>
              <DeleteButton onClick={() => handleDeleteClick(hashtag)} />
            </HeaderCell>
          </HeaderRow>
        ))}
      </div>

      <AddHashtagModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddHashtag}
        newHashtagName={newHashtagName}
        setNewHashtagName={(value) => setNewHashtagName(value)}
      />
      <ConfirmDelete isOpen={isDeleteModalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </TableWrapper>
  );
};

export default HashtagTable;

const HashtagWrapper = styled.div`
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

const Title = styled.div`
  color: #1e1e1e;
  font-family: '해피니스 산스 타이틀';
  font-size: 32px;
  text-align: center;
`;

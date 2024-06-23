import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddHashtagModal from './AddHashtagModal';
import ConfirmDelete from './ConfirmDelete';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
import CancelButton from '../common/CancleButton';
import AddButton from '../common/AddButton';
import SaveButton from '../common/SaveButton';

// Styled Components
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

// Component
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
    axios
      .get('http://localhost:8080/admin/event/hashtag/list')
      .then((response) => {
        // 데이터를 성공적으로 받아왔을 때
        console.log(response.data); // 받아온 데이터 확인 (개발 중에 유용함)
        // 데이터를 업데이트
        setHashtagData(response.data.hashtagList);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error fetching hashtag data:', error);
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
    axios
      .put('http://localhost:8080/admin/event/hashtag', {
        hashtagId: editHashtagId,
        hashtagName: editHashtagName,
      })
      .then((response) => {
        // 데이터를 성공적으로 업데이트했을 때
        console.log(response.data);
        const updatedData = hashtagData.map((hashtag) =>
          hashtag.hashtagId === editHashtagId ? { ...hashtag, hashtagName: editHashtagName } : hashtag,
        );
        setHashtagData(updatedData);
        setEditHashtagId(null); // 수정 모드 종료
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error updating hashtag data:', error);
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
    axios
      .post('http://localhost:8080/admin/event/hashtag', {
        hashtagName: newHashtagName,
      })
      .then((response) => {
        fetchData();
        setIsAddModalOpen(false);
        setNewHashtagName('');
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error adding hashtag:', error);
      });
  };

  const handleDeleteClick = (hashtag) => {
    setHashtagToDelete(hashtag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!hashtagToDelete) return;

    axios
      .delete(`http://localhost:8080/admin/event/hashtag/${hashtagToDelete.hashtagId}`)
      .then((response) => {
        // 데이터를 성공적으로 삭제했을 때
        console.log(response.data);
        const updatedData = hashtagData.filter((hashtag) => hashtag.hashtagId !== hashtagToDelete.hashtagId);
        setHashtagData(updatedData);
        setHashtagToDelete(null);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        // 요청이 실패했을 때
        console.error('Error deleting hashtag data:', error);
      });
  };

  const handleCancelDelete = () => {
    setHashtagToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <HashtagWrapper>
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
    </HashtagWrapper>
  );
};

export default HashtagTable;

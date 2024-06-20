import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddHashtagModal from './AddHashtagModal'; // 새로 추가한 파일

// Styled Components
const HashtagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #f0f5f4;
  width: 1036px;
`;

const RowContainer = styled.div`
  width: 1036px;
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

const EditButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const SaveButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const CancelButton = styled.button`
  width: 60px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #dc3545; /* Red background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const AddButton = styled.button`
  width: 160px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

// Component
const HashtagTable = () => {
  const [hashtagData, setHashtagData] = useState([]);
  const [editHashtagId, setEditHashtagId] = useState(null);
  const [editHashtagName, setEditHashtagName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHashtagName, setNewHashtagName] = useState('');

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

  return (
    <HashtagWrapper>
      <Header>
        <HeaderRow>
          <HeaderCell width="160px">
            <TextWrapper>해시태그 번호</TextWrapper>
          </HeaderCell>
          <HeaderCell width="416px" hasBorder>
            <TextWrapper>해시태그 이름</TextWrapper>
          </HeaderCell>
          <HeaderCell width="120px" hasBorder>
            <TextWrapper>수정</TextWrapper>
          </HeaderCell>
        </HeaderRow>
      </Header>
      <RowContainer>
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
            <HeaderCell width="120px" hasBorder>
              {editHashtagId === hashtag.hashtagId ? (
                <>
                  <SaveButton onClick={handleSaveClick}>적용</SaveButton>
                  <CancelButton onClick={handleCancelClick}>취소</CancelButton>
                </>
              ) : (
                <EditButton onClick={() => handleEditClick(hashtag.hashtagId, hashtag.hashtagName)}>수정</EditButton>
              )}
            </HeaderCell>
          </HeaderRow>
        ))}
      </RowContainer>
      <AddButton onClick={handleAddClick}>해시태그 추가</AddButton>
      <AddHashtagModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddHashtag}
        newHashtagName={newHashtagName}
        setNewHashtagName={(value) => setNewHashtagName(value)}
      />
    </HashtagWrapper>
  );
};

export default HashtagTable;

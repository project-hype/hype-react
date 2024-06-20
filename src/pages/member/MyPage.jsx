import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import MyPageForm from '../../components/member/MyPageForm';
import FavoriteEventList from '../../components/member/FavoriteEventList';
import SubMenu from '../../components/member/Submenu';
import { PageTitle } from '../../components/member/MemberStyledComponents';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../state/authState';

function MyPage() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myInfo'); // 활성 탭 초기화
  useEffect(() => {
    // 로그인 상태를 확인하고, 비로그인 상태라면 메인 페이지로 리다이렉트
    if (!user.isLoggedIn) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {user.userInfo && (
        <>
          <MainLayout />
          <PageTitle>마이페이지</PageTitle>
          <SubMenu onTabChange={handleTabChange} activeTab={activeTab} />
          {activeTab === 'myInfo' && <MyPageForm />}
          {activeTab === 'favorites' && <FavoriteEventList />}
        </>
      )}
    </div>
  );
}

export default MyPage;

import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import MyPageForm from '../../components/member/MyPageForm';
import FavoriteForm from '../../components/member/FavoriteForm';
import SubMenu from '../../components/member/Submenu';

function MyPage() {
  const [activeTab, setActiveTab] = useState('myInfo'); // Initial active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <MainLayout />
      <SubMenu onTabChange={handleTabChange} activeTab={activeTab} />
      {activeTab === 'myInfo' && <MyPageForm />}
      {activeTab === 'favorites' && <FavoriteForm />}
    </div>
  );
}

export default MyPage;

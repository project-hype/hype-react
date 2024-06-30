import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import MyPageForm from '../../components/member/mypage/MyPageForm';
import FavoriteEventList from '../../components/member/mypage/FavoriteEventList';
import SubMenu from '../../components/member/mypage/Submenu';
import { PageTitle } from '../../components/member/common/MemberStyledComponents';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../state/authState';

/**
 * 마이페이지
 * @author 임원정
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	임원정        최초 생성
 * 2024.06.21  	임원정        페이지 제목 추가
 * </pre>
 */

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
          <MainLayout>
            <PageTitle>마이페이지</PageTitle>
            <SubMenu onTabChange={handleTabChange} activeTab={activeTab} />
            {activeTab === 'myInfo' && <MyPageForm />}
            {activeTab === 'favorites' && <FavoriteEventList />}
          </MainLayout>
        </>
      )}
    </div>
  );
}

export default MyPage;

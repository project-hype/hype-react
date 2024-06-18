import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import image from '../../assets/img/event/eventImg.jpeg';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

function EventBanner({ title, type }) {
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);
  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);
  const moveToDetailPage = (storeId, e) => {
    if (dragging) {
      e.stopPropagation();
      return;
    } else {
      window.location.href = `/popup/${storeId}`;
    }
  };

  //팝업배너 전체 너비 구하기
  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef);
  const a = Number(width / 280).toFixed(1);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Number(a),
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    touchThreshold: 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  //bookmark src 변경
  //   const [activeIndex, setActiveIndex] = useState(null);

  //   const bookmarkClick = async (isClick: boolean, storeId: number) => {
  //     if (!myInfo) {
  //       window.location.href = `/member`;
  //     } else {
  //       setActiveIndex(storeId);
  //       if (likeStore.includes(storeId)) {
  //         likeStoreSetter(likeStore.filter((item) => item !== storeId));
  //       } else {
  //         likeStoreSetter([...new Set([...likeStore, storeId])]);
  //       }
  //     }
  //   };

  const BannerWrap = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 20px auto 0;
  `;

  const Header = styled.header`
    font-family: '해피니스 산스 타이틀';
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
  `;

  const Title = styled.h2`
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
  `;

  const MoreView = styled.div`
    font-family: '해피니스 산스';
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 15px 20px 10px;
  `;

  const EventInner = styled.div`
    width: 100%;
    max-width: 960px;
    height: -moz-fit-content;
    height: fit-content;
    padding-left: 20px;
  `;

  const PopupBannerList = styled.div`
    width: fit-content !important;
    height: 100%;
    position: relative;
    cursor: pointer;
  `;

  return (
    <BannerWrap>
      <Header>
        <Title>{title}</Title>
        <MoreView>
          {/* <Link to={`/popup${query}`}>더보기</Link> */}
          <Link to={`/popup`}>더보기</Link>
        </MoreView>
      </Header>

      <EventInner>
        <Slider {...settings}>
          <div className="popupbanner-list">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faRegularHeart} />
            <p> //즐겨찾기</p>
            <div className="slide-img-wrap">
              <img src={image} className="popup-img" />
            </div>
            <ul className="eventbanner-list-info">
              <li className="event-name">
                <p>Event.getTitle</p>
              </li>
              <li className="event-branch">
                <FontAwesomeIcon icon={faLocationDot} /> Event.getBranchName
              </li>
            </ul>
          </div>
        </Slider>
      </EventInner>

      {/* <div className="popupbanner-inner" ref={componentRef}>
        {settings.slidesToShow !== 0 && (
          <Slider {...settings}>
            {storeList && storeList.length > 0 && storeList.map((store, idx) => (
              <div key={idx} className="popupbanner-list">
                <p onClick={() => bookmarkClick(true, store.storeId)}>
                  <Bookmark store={store} likeStore={likeStore} myInfo={myInfo} />
                </p>
                <div
                  className="slide-img-wrap"
                  onClick={e => moveToDetailPage(store.storeId, e)}
                  key={idx}
                >
                  <img src={store.thumbnails ? store.thumbnails : nonethumb} alt="" className="popup-img" />
                </div>
                <ul className="popupbanner-list-info">
                  <li className="popup-name">
                    <p>{store.title}</p>
                  </li>
                  <li className="popup-location">
                    <img src={slidemapicon} alt="" /> {store.topLevelAddress}
                  </li>
                </ul>
              </div>
            ))}
          </Slider>
        )}
      </div> */}
    </BannerWrap>
  );
}

export default EventBanner;

export const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth ? myRef.current?.offsetWidth : 0,
      height: myRef.current?.offsetHeight ? myRef.current?.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};

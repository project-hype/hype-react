import '../../assets/scss/common.scss';
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import image from '../../assets/img/event/eventImg.jpeg';
import favoriteImage from '../../assets/img/common/bookmark.svg';
import afterImage from '../../assets/img/common/background.png';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const BannerWrap = styled.div`
  width: 90%;
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

const FavoriteP = styled.p`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
`;

const FavoriteA = styled.a`
  position: absolute;
  color: inherit;
  cursor: pointer;
  right: 0;
  top: 0;
`;

const FavoriteImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;
  display: block;
`;

const SlideImgWrap = styled.div`
  display: block;
  unicode-bidi: isolate;
  box-sizing: border-box;

  &:after {
    background: url(${afterImage}) 0 0;
    content: ' ';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    left: 0;
    top: 0;
    opacity: 0.8;
    z-index: 1;
  }
`;

const EventImage = styled.img`
  width: 260px;
  height: 260px;
  border-radius: 8px;
`;

const EventInfo = styled.ul`
  position: absolute;
  left: -25px;
  bottom: 20px;
  z-index: 10;
  color: white;
`;

const EventLi = styled.li`
  padding-bottom: 5px;
  list-style: none;
`;

const EventName = styled(EventLi)`
  font-size: 16px;
  font-weight: 700;
`;

const EventBranch = styled(EventLi)`
  font-size: 12px;
  opacity: 0.6;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 3px;
`;

const EventType = styled(EventLi)`
  font-size: 10px;
  opacity: 0.6;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 3px;
`;

function EventBanner({ title, type }) {
  const [data, setData] = useState([]);

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
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    touchThreshold: 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/list/${type}?memberId=1`);
        const result = response.data.eventList;
        setData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [type]);

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
          {data.map((event) => (
            // <div className="popupbanner-list">

            // </div>
            // PopupBannerList
            <PopupBannerList>
              {/* <FontAwesomeIcon icon={faRegularHeart} /> */}
              <FavoriteP>
                <FavoriteA>
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                  <FavoriteImg src={favoriteImage} />
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                </FavoriteA>
              </FavoriteP>
              <SlideImgWrap>
                <EventImage src={event.imageUrl} />
              </SlideImgWrap>
              <EventInfo>
                <EventName>
                  <p>{event.title}</p>
                </EventName>
                <EventBranch>
                  <FontAwesomeIcon icon={faLocationDot} /> {event.branchName}
                </EventBranch>
                <EventType>{event.eventTypeName} </EventType>
              </EventInfo>
            </PopupBannerList>
          ))}
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

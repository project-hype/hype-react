import styled from 'styled-components';
import '../../assets/scss/common.scss';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import EventAPI from '../../api/event/eventAPI';

/**
 * 이벤트 서브 배너 리스트
 * @author 정은지
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	정은지        최초 생성
 * 2024.06.30   정은지        구조 리팩토링
 * </pre>
 */
const MoreButton = styled(Link)`
  text-decoration: none !important;
  color: inherit;
  &:hover,
  &:focus {
    color: #ff8c00 !important;
  }
`;

function EventBanner({ title, type }) {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);
  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const moveToDetailPage = (eventId, e) => {
    if (dragging) {
      e.stopPropagation();
      return;
    } else {
      window.location.href = `/event/${eventId}`;
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
    slidesToShow: 3.5,
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
        let memberId = '';
        if (user.isLoggedIn) {
          memberId = user.userInfo.memberId;
        }
        const response = await EventAPI.subBanner(type);
        setData(response.data.eventList);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [type]);

  if (!data || data.length === 0) {
    return <div className="popupbanner-wrap"></div>;
  }

  return (
    <>
      <div className="popupbanner-wrap">
        <header>
          <h2 className="popupbanner-tit">{title}</h2>
          <div className="moreview">
            <MoreButton to={`/search/`}>더보기</MoreButton>
          </div>
        </header>
        <div className="popupbanner-inner">
          <Slider {...settings}>
            {data.map((event) => (
              <div key={event.eventId} className="popupbanner-list">
                <div
                  className="slide-img-wrap"
                  onClick={(e) => {
                    moveToDetailPage(event.eventId, e);
                  }}
                >
                  <img src={event.imageUrl} class="popup-img" />
                </div>
                <ul class="popupbanner-list-info">
                  <li class="event-type">{event.eventTypeName}</li>
                  <li class="event-name">
                    <p>{event.title}</p>
                  </li>
                  <li class="event-location">
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> {event.branchName}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
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

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

function EventBanner2({ title, type }) {
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
    slidesToShow: Number(a),
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

  return (
    <>
      <div className="popupbanner-wrap">
        <header>
          <h2 className="popupbanner-tit">{title}</h2>
          <div className="moreview">
            <Link to={`/popup`}>더보기</Link>
          </div>
        </header>
        <div class="popupbanner-inner">
          <Slider {...settings}>
            {data.map((event) => (
              <div
                className="popupbanner-list"
                onClick={(e) => {
                  moveToDetailPage(event.eventId, e);
                }}
              >
                <p>
                  <a class="bookmark-wrap">
                    <img src={favoriteImage} />
                  </a>
                </p>
                <div className="slide-img-wrap">
                  <img src={event.imageUrl} class="popup-img" />
                </div>
                <ul class="popupbanner-list-info">
                  <li class="event-name">
                    <p>{event.title}</p>
                  </li>
                  <li class="event-location">
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> {event.branchName}
                    </p>
                  </li>
                  <li class="event-type">
                    <p>{event.eventTypeName}</p>
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

export default EventBanner2;

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

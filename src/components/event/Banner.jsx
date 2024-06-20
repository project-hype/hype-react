import React, { useEffect, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import '../../assets/scss/common.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Banner() {
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
  const slickRef = useRef(null);

  // slider custom arrow
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <div className="mainPrevious" onClick={onClick} />;
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <div className="mainNext" onClick={onClick} />;
  };
  const settings = {
    dots: true,
    dotsClass: 'popup-banner-dots',
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    swipeToSlide: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/event/list/banner');
        const result = response.data.eventList;
        setData(result);
        // console.log(result);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    // <div style={{ position: 'relative', textAlign: 'center', width: '800px', margin: '0 auto' }}>
    <div style={{ position: 'relative' }}>
      <Slider {...settings}>
        {data.map((event, index) => (
          <div
            key={index}
            className="popupbanner-list"
            onClick={(e) => {
              moveToDetailPage(event.eventId, e);
            }}
          >
            <div className="slide-content">
              <div className="slide-img-wrap">
                <img src={event.imageUrl} />
              </div>
              <div>
                <p className="slide-tit">{event.title}</p>
                <p>
                  {event.startDate} ~ {event.endDate}
                </p>
                <p>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {event.branchName}
                </p>
                <p>{event.eventTypeName}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;

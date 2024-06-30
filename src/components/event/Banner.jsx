import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/scss/common.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import EventAPI from '../../api/event/eventAPI';

const InfoContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 8px; /* 원하는 위치로 조정 */
`;

function Banner() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
      navigate(`/event/${eventId}`);
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
        const response = await EventAPI.banner();
        setData(response.data.eventList);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    // <div style={{ position: 'relative', textAlign: 'center', width: '800px', margin: '0 auto' }}>
    <div style={{ position: 'relative' }}>
      <Slider {...settings}>
        {data.map((event) => (
          <div
            key={event.eventId}
            className="popupbanner-list"
            onClick={(e) => {
              moveToDetailPage(event.eventId, e);
              console.log(event.eventId);
            }}
          >
            <div className="slide-content">
              <div className="slide-img-wrap">
                <img src={event.imageUrl} />
              </div>
              <div>
                <span className="slide-tit">
                  {event.title.length >= 20 ? event.title.substr(0, 20) + '...' : event.title}
                </span>
                <span className="slide-type"> | {event.eventTypeName} </span>
                <p className="slide-date">
                  {event.startDate} ~ {event.endDate}
                </p>
                <p className="slide-location">
                  <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }} />
                  {event.branchName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;

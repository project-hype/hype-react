import React, { Component, useCallback, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../../assets/img/event/eventImg.jpeg';

function BannerList() {
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);
  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);
  const moveToDetailPage = (e) => {
    if (dragging) {
      e.stopPropagation();
      return;
    }
  };
  const slickRef = useRef(null);
  // 슬릭에 임시로 넣을 이미지
  const images = [
    { src: image, title: 1 },
    { src: image, title: 2 },
    { src: image, title: 3 },
    { src: image, title: 4 },
  ];

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
  //   const settings = {
  //     dots: true,
  //     dotsClass: 'popup-banner-dots',
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 1,
  //     autoplay: false,
  //     autoplaySpeed: 2000,
  //     arrows: true,
  //     nextArrow: <CustomNextArrow />,
  //     prevArrow: <CustomPrevArrow />,
  //     draggable: false,
  //   };
  return (
    <div stlye={{ position: 'relative' }}>
      <h2> Single Item</h2>
      <Slider {...settings}>
        {images.map((el) => (
          <div key={el.title}>
            <img src={el.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerList;

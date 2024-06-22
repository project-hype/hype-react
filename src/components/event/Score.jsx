import React, { useEffect, useState } from 'react';
import '../../assets/scss/common.scss';

<div className="review">
  <div className="container">
    <div className="text-wrapper">
      총 {data.scores ? data.scores.length : 0}명이 별점을 달았습니다.
      {/* <div className="overlap-group">
        {data.averageScore ? data.averageScore : 0}
        <StarRatings rating={data.averageScore} starRatedColor="#1e9d8b" name="rating" />
      </div> */}
      {/* <div className="overlap">
      <div className="rectangle" />
    </div>
    <div className="overlap-2">
      <div className="rectangle-2" />
      <img className="img" alt="Mask group" src="mask-group.png" />
      <img className="mask-group-2" alt="Mask group" src="mask-group-2.png" />
    </div>
    <div className="rectangle-3" />
    <div className="rectangle-4" />
    <img className="stars" alt="Stars" src="stars.png" /> */}
      <div className="text-wrapper-11">
        <p>{averageScore}</p>
        <StarRatings rating={averageScore} starRatedColor="#1e9d8b" name="rating" />
      </div>
    </div>
    <div className="review-detail">
      <div className="container-2">
        <div className="horizontal-border">
          <div className="container-4">
            <div className="div-wrapper">
              <div className="text-wrapper-13">클릭해서 별점을 매겨주세요!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Base>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={4.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={3.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={2.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={1.5} isHalf={true} />
        <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
        <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} />
      </RatingField>
      <RatingValue>{rating}</RatingValue>
    </Base>
  </div>
</div>;

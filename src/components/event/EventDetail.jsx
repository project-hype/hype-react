import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faEye, faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const StyledAticle = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  & .title {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 256px;
    position: relative;

    & .group {
      height: 123px;
      position: relative;
      width: 928px;

      & .titlte {
        height: 123px;
        left: 0;
        position: absolute;
        top: 0;
        width: 577px;

        & .text-wrapper {
          color: var(--collection-1-HD-black);
          font-family: 'Happiness Sans-Title', Helvetica;
          font-size: 80px;
          font-weight: 400;
          height: 123px;
          left: 0;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: -4px;
          width: 928px;
        }
      }

      & .image {
        height: 123px;
        left: 882px;
        position: absolute;
        top: 0;
        width: 46px;
      }
    }

    & .view {
      height: 46px;
      position: relative;
      width: 170px;

      & .div {
        align-items: center;
        display: inline-flex;
        gap: 8px;
        left: 0;
        position: absolute;
        top: 8px;

        & .mdi-eye {
          height: 24px;
          position: relative;
          width: 24px;
        }

        & .text-wrapper-2 {
          color: var(--popplycokrboulder);
          font-family: 'Happiness Sans-Title', Helvetica;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: normal;
          margin-top: -1px;
          position: relative;
          width: fit-content;
        }
      }

      & .view-2 {
        align-items: center;
        display: inline-flex;
        gap: 8px;
        left: 101px;
        position: absolute;
        top: 8px;

        & .img {
          flex: 0 0 auto;
          position: relative;
        }
      }
    }
  }

  & .detail {
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 24px;
    padding: 0px 256px;
    position: relative;
    width: 1440px;

    & .hashtag {
      align-items: center;
      align-self: stretch;
      display: flex;
      flex: 0 0 auto;
      flex-wrap: wrap;
      gap: 0px 10px;
      position: relative;
      width: 100%;

      & .item {
        align-items: center;
        border: 1px solid;
        border-color: var(--popplycokrmine-shaft);
        border-radius: 20px;
        display: inline-flex;
        flex: 0 0 auto;
        flex-direction: column;
        padding: 9px 13px;
        position: relative;

        & .text-wrapper-3 {
          color: var(--collection-1-HD-black);
          font-family: var(--popply-co-kr-roboto-regular-13-13-font-family);
          font-size: var(--popply-co-kr-roboto-regular-13-13-font-size);
          font-style: var(--popply-co-kr-roboto-regular-13-13-font-style);
          font-weight: var(--popply-co-kr-roboto-regular-13-13-font-weight);
          letter-spacing: var(--popply-co-kr-roboto-regular-13-13-letter-spacing);
          line-height: var(--popply-co-kr-roboto-regular-13-13-line-height);
          margin-top: -1px;
          position: relative;
          text-align: center;
          white-space: nowrap;
          width: fit-content;
        }

        & .text-wrapper-4 {
          color: var(--collection-1-HD-black);
          font-family: var(--popply-co-kr-roboto-regular-13-23-font-family);
          font-size: var(--popply-co-kr-roboto-regular-13-23-font-size);
          font-style: var(--popply-co-kr-roboto-regular-13-23-font-style);
          font-weight: var(--popply-co-kr-roboto-regular-13-23-font-weight);
          letter-spacing: var(--popply-co-kr-roboto-regular-13-23-letter-spacing);
          line-height: var(--popply-co-kr-roboto-regular-13-23-line-height);
          margin-top: -1px;
          position: relative;
          text-align: center;
          width: fit-content;
        }

        & .text-wrapper-5 {
          color: var(--collection-1-HD-black);
          font-family: var(--popply-co-kr-roboto-regular-14-font-family);
          font-size: var(--popply-co-kr-roboto-regular-14-font-size);
          font-style: var(--popply-co-kr-roboto-regular-14-font-style);
          font-weight: var(--popply-co-kr-roboto-regular-14-font-weight);
          letter-spacing: var(--popply-co-kr-roboto-regular-14-letter-spacing);
          line-height: var(--popply-co-kr-roboto-regular-14-line-height);
          margin-top: -1px;
          position: relative;
          text-align: center;
          white-space: nowrap;
          width: fit-content;
        }
      }
    }

    & .period-location {
      align-items: flex-start;
      align-self: stretch;
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      gap: 16px;
      padding: 1px 0px;
      position: relative;
      width: 100%;

      & .period {
        height: 38px;
        position: relative;
        width: 319px;

        & .text-wrapper-6 {
          color: #595959;
          font-family: 'Happiness Sans-Bold', Helvetica;
          font-size: 30px;
          font-weight: 700;
          height: 38px;
          left: 0;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: 0;
        }

        & .text-wrapper-7 {
          color: #000000;
          font-family: 'Happiness Sans-Title', Helvetica;
          font-size: 30px;
          font-weight: 400;
          height: 38px;
          left: 77px;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: 0;
        }
      }

      & .location {
        height: 38px;
        position: relative;
        width: 369px;

        & .text-wrapper-6 {
          color: #595959;
          font-family: 'Happiness Sans-Bold', Helvetica;
          font-size: 30px;
          font-weight: 700;
          height: 38px;
          left: 0;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: 0;
        }

        & .text-wrapper-8 {
          color: #000000;
          font-family: 'Happiness Sans-Title', Helvetica;
          font-size: 30px;
          font-weight: 400;
          height: 38px;
          left: 77px;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: 0;
        }
      }
    }

    & .description {
      align-self: stretch;
      height: 683px;
      margin-right: -2px;
      position: relative;
      width: 100%;

      & .p {
        color: #000000;
        font-family: 'Happiness Sans-Bold', Helvetica;
        font-size: 48px;
        font-weight: 700;
        height: 139px;
        left: 0;
        letter-spacing: 0;
        line-height: normal;
        position: absolute;
        top: 0;
        width: 928px;

        & .span {
          color: #000000;
          font-family: 'Happiness Sans-Bold', Helvetica;
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
        }

        & .text-wrapper-9 {
          font-size: 32.9px;
        }
      }

      & .frame {
        background-color: #eeeeee;
        height: 507px;
        left: 0;
        position: absolute;
        top: 176px;
        width: 928px;

        & .text-wrapper-10 {
          color: #000000;
          font-family: 'Happiness Sans-Regular', Helvetica;
          font-size: 30px;
          font-weight: 400;
          height: 507px;
          left: 0;
          letter-spacing: 0;
          line-height: normal;
          position: absolute;
          top: -1px;
          width: 928px;
        }
      }
    }
  }
`;

const EventDetail = ({}) => {
  const { eventId } = useParams();
  const [likeStatus, setLikeStatus] = useState({}); // 즐겨찾기 상태를 저장할 객체
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/${eventId}?memberId=1`);
        const result = response.data.eventList;
        setData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     // 초기 즐겨찾기 상태 설정
  //     const status = {};
  //     events.forEach((event) => {
  //       status[event.eventId] = event.favorite; // 이벤트의 즐겨찾기 상태를 설정
  //     });
  //     setLikeStatus(status);
  //   }, [eventId]);

  const toggleFavorite = async (eventId) => {
    try {
      const isFavorite = likeStatus[eventId];
      let response;
      console.log(!isFavorite + eventId);

      if (isFavorite) {
        // 이미 즐겨찾기 되어 있는 경우 삭제 API 호출
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: '3',
            eventId: eventId,
          },
        });
      } else {
        // 즐겨찾기 추가 API 호출
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: '3',
          eventId: eventId,
        });
      }

      // 즐겨찾기 상태 업데이트
      setLikeStatus({
        ...likeStatus,
        [eventId]: !isFavorite, // 해당 이벤트의 즐겨찾기 상태 반전
      });

      console.log('Toggled favorite:', response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <StyledAticle>
      {data.map((event) => (
        <>
          <div className="title">
            <div className="group">
              <div className="titlte">
                <div className="text-wrapper">{event.title}</div>
              </div>
              <img className="image" alt="Image" src={event.imageUrl} />
            </div>
            <div className="view">
              <div className="div">
                <FontAwesomeIcon icon={faEye} />
                <div className="text-wrapper-2">{event.viewCount}</div>
              </div>
              <div className="view-2">
                <FontAwesomeIcon icon={faStar} />
                <div className="text-wrapper-2">{event.favoriteCount}</div>
              </div>
            </div>
          </div>
          <div className="detail">
            <div className="hashtag">
              <div className="item">
                <div className="text-wrapper-3">산리오</div>
              </div>
              <div className="item">
                <div className="text-wrapper-3">헬로키티</div>
              </div>
              <div className="item">
                <div className="text-wrapper-4">전시</div>
              </div>
              <div className="item">
                <div className="text-wrapper-3">동대문디자인플라자</div>
              </div>
              <div className="item">
                <div className="text-wrapper-5">DDP</div>
              </div>
              <div className="item">
                <div className="text-wrapper-4">굿즈</div>
              </div>
              <div className="item">
                <div className="text-wrapper-3">이벤트</div>
              </div>
              <div className="item">
                <div className="text-wrapper-3">얼리버드</div>
              </div>
              <div className="item">
                <div className="text-wrapper-4">티켓</div>
              </div>
            </div>
            <div className="period-location">
              <div className="period">
                <div className="text-wrapper-6">기간</div>
                <div className="text-wrapper-7">24.06.05 - 06.16</div>
              </div>
              <div className="location">
                <div className="text-wrapper-6">장소</div>
                <div className="text-wrapper-8">더현대 1층 팝업 스토어</div>
              </div>
            </div>
            <div className="description">
              <p className="p">
                <span className="span">
                  “일상의 피로에서 떠나요&#34;
                  <br />
                </span>
                <span className="text-wrapper-9">
                  <br />
                  여행에 필요한 상품을 저렴하게 준비해보는 건 어떨까요?
                </span>
              </p>
              <div className="frame">
                <p className="text-wrapper-10">
                  여행 가려면 캐리어도 필요하고 뭣도 필요하고 카메라도 필요하고 옷도 필요하고 어쩌고 저쩌고
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </StyledAticle>
    // <div>
    //   {data.map((event) => (
    //     <div key={event.eventId}>
    //       <h1>{event.title}</h1>
    //       <img src={event.imageUrl} alt={data.title} />
    //       <p>{event.content}</p>
    //     </div>
    //   ))}
    // </div>
  );
};
export default EventDetail;

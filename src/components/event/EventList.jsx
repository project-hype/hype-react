import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../../assets/scss/common.scss';

const EventList = ({ events }) => {
  console.log('eventList' + events.length);
  return (
    <ul>
      {events.length > 0 ? (
        events.map((event, index) => (
          <li key={index}>
            <div>
              <Link to={`/event/${event.eventId}`} className="event-img-wrap">
                <img src={event.imageUrl} className="event-img" />
              </Link>
              <Link to={`/event/${event.eventId}`} style={{ textDecoration: 'none' }}>
                <ul>
                  <li className="event-name">
                    <p>{event.title}</p>
                  </li>
                  <li className="event-branch">
                    <FontAwesomeIcon icon={faLocationDot} /> {event.branchName}
                  </li>
                  <li className="event-type">{event.eventTypeName}</li>
                  <li>
                    <p className="event-date">
                      {event.startDate}~{event.endDate}
                    </p>
                  </li>
                </ul>
              </Link>
            </div>
          </li>
        ))
      ) : (
        <div className="calendar-popup-list-blank"></div> // stores가 없거나 길이가 0일 때 빈 화면을 렌더링
      )}
    </ul>
  );
};
export default EventList;

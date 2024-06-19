import styled from 'styled-components';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function EventList() {
  return (
    <>
      <ul>
        <li>
          <div>
            <Link to={`/event/`} className="event-img-wrap">
              <ul>
                <li className="event-name">
                  <p>EventTitle</p>
                </li>
                <li className="event-branch">
                  <FontAwesomeIcon icon={faLocationDot} /> Event.getBranchName
                </li>
                <li>
                  <p className="event-date">StartDate ~ EndDate</p>
                </li>
              </ul>
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}
export default EventList;

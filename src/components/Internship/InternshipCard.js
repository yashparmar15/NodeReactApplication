import React from 'react';

import './InternshipCard.css';

function InternshipCard(props) {
  return (
    <div>
      <div class='card mb-3 card-internship'>
        <div class='row no-gutters'>
          <div class='col-md-2'>
            <img
              src={props.internship.internshipBy.picture}
              class='card-img card-internship-img'
              alt='...'
            />
          </div>
          <div class='col-md-10'>
            <div class='card-body'>
              <h5 class='card-title'>
                {props.internship.internshipBy.username}
                <div className='text-muted'>{props.internship.companyName}</div>
                <div className='text-muted'>{props.internship.jobProfile}</div>
              </h5>

              <p class='card-text'>{props.internship.interview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternshipCard;

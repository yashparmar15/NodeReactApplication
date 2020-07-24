import React, { useState } from 'react';
import axios from 'axios';

import './InternshipCard.css';
import { connect } from 'react-redux';
import InternshipUpdateModal from './InternshipUpdateModal';

function InternshipCard(props) {
  const [readOnly, setreadOnly] = useState(true);
  const [displayButton, setdisplayButton] = useState(false);
  const [company, setCompany] = useState(props.internship.companyName);
  const [jobProfile, setjobProfile] = useState(props.internship.jobProfile);
  const [interview, setInterview] = useState(props.internship.interview);

  function handleNewInternshipSubmit(e) {
    e.preventDefault();
    PostInternship(company, jobProfile, interview, props.internship._id);
    // window.location.reload(false);
  }

  function PostInternship(company, jobProfile, interview, id) {
    console.log(company, jobProfile, interview, id);
    axios.put('/api/internships', {
      company,
      jobProfile,
      interview,
      id,
    });
  }

  console.log(interview);
  return (
    <div>
      <div className='card mb-4 card-internship border-left-0 border-bottom-0 border-right-0'>
        <div className='row no-gutters'>
          <div className='col-md-2'>
            <img
              src={props.internship.internshipBy.picture}
              className='card-img card-internship-img'
              alt='profile-pic'
            />
          </div>
          <div className='col-md-10'>
            <div className='card-body'>
              <h5 className='card-title'>
                {props.internship.internshipBy.username}
                {props.userId === props.internship.internshipBy._id && (
                  <div className='float-right'>
                    {/* <InternshipUpdateModal
                      id={props.internship._id}
                      name={props.internship.internshipBy.username}
                      company={props.internship.companyName}
                      profile={props.internship.jobProfile}
                      interview={props.internship.interview}
                    /> */}
                    <button
                      onClick={(e) => {
                        setreadOnly(!readOnly);
                        setdisplayButton(!displayButton);
                      }}
                      className='btn'
                    >
                      <i className='fas fa-edit'></i>
                    </button>
                  </div>
                )}
                <form onSubmit={handleNewInternshipSubmit}>
                  <div className='d-flex flex-column h-100'>
                    <input
                      type='text'
                      readOnly={readOnly}
                      value={company}
                      className=' border-0'
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                    />
                    <input
                      className='border-0'
                      readOnly={readOnly}
                      value={jobProfile}
                      onChange={(e) => {
                        setjobProfile(e.target.value);
                      }}
                    />
                  </div>
                  <div className='input-interview'>
                    <textarea
                      type='text'
                      readOnly={readOnly}
                      className='border-0 textarea-interview'
                      value={interview}
                      onChange={(e) => {
                        setInterview(e.target.value);
                      }}
                    />
                    {displayButton && (
                      <button type='submit' className={`btn btn-success mt-3 `}>
                        Save Changes
                      </button>
                    )}
                  </div>
                </form>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userData._id,
  };
};
export default connect(mapStateToProps)(InternshipCard);

import React, { useState } from 'react';
import axios from 'axios';

import './InternshipCard.css';
import { connect } from 'react-redux';

function InternshipCard(props) {
  const [readOnly, setreadOnly] = useState(true);
  const [displayButton, setdisplayButton] = useState(false);
  const [border, setBorder] = useState(false);
  const [company, setCompany] = useState(props.internship.companyName);
  const [jobProfile, setjobProfile] = useState(props.internship.jobProfile);
  const [interview, setInterview] = useState(props.internship.interview);
  const [alert, setAlert] = useState(false);

  function handleNewInternshipSubmit(e) {
    e.preventDefault();
    setreadOnly(!readOnly);
    setdisplayButton(!displayButton);
    setBorder(!border);
    PostInternship(company, jobProfile, interview, props.internship._id);
    // window.location.reload(false);
    setTimeout(function () {
      setAlert(true);
      setTimeout(function () {
        setAlert(false);
      }, 3000);
    }, 1000);
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
        {alert && (
          <div
            class='alert alert-success alert-dismissible fade show'
            role='alert'
          >
            Internship information updated!
            <button
              type='button'
              class='close'
              data-dismiss='alert'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        )}
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
                    <button
                      onClick={(e) => {
                        setreadOnly(!readOnly);
                        setdisplayButton(!displayButton);
                        setBorder(!border);
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
                      className={!border && `border-0`}
                      type='text'
                      readOnly={readOnly}
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                    />

                    <input
                      className={!border && `border-0`}
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
                      id='interview'
                      readOnly={readOnly}
                      className={`${!border && 'border-0'} textarea-interview`}
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

import React, { useState } from 'react';
import axios from 'axios';

import './InternshipModal.css';

function InternshipModal() {
  const [yearofInternship, setyearofInternship] = useState('');

  const [companyName, setcompanyName] = useState('');
  const [jobProfile, setjobProfile] = useState('');
  const [interview, setinterview] = useState('');
  const [topicsCovered, settopicsCovered] = useState('');

  function handleInternshipSubmit(e) {
    e.preventDefault();
    PostInternship(
      yearofInternship,
      companyName,
      jobProfile,
      interview,
      topicsCovered
    );
    window.location.reload(false);
  }

  function PostInternship(
    yearOfInternship,
    companyName,
    jobProfile,
    interview,
    topicsCovered
  ) {
    console.log(
      yearOfInternship,
      companyName,
      jobProfile,
      interview,
      topicsCovered
    );
    axios.post('/api/internships', {
      yearOfInternship,
      companyName,
      jobProfile,
      interview,
      topicsCovered,
    });
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#internshipModal'
      >
        Add your Internship Experience
      </button>

      <div
        className='modal fade'
        id='internshipModal'
        // tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog internship-modal-dialog'>
          <div className='modal-content internship-modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add Internship Experience!
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleInternshipSubmit}>
                <label htmlFor='year'>Year of Internship:</label>
                <input
                  type='number'
                  name='yearOfInternship'
                  id='year'
                  className='form-control'
                  onChange={(e) => setyearofInternship(e.target.value)}
                />
                <label htmlFor='company'>Company Name: </label>
                <input
                  type='text'
                  name='companyName'
                  id='company'
                  className='form-control'
                  onChange={(e) => setcompanyName(e.target.value)}
                />
                <label htmlFor='jobProfile'>Job Profile:</label>
                <input
                  type='text'
                  name='jobProfile'
                  id='jobProfile'
                  className='form-control'
                  onChange={(e) => setjobProfile(e.target.value)}
                />
                <label htmlFor='interview'>Interview Questions:</label>
                <textarea
                  name='interview'
                  id='interview'
                  className='form-control'
                  onChange={(e) => setinterview(e.target.value)}
                />
                <label htmlFor='topics'>Topics Covered</label>
                <input
                  type='text'
                  name='topicsCovered'
                  id='topics'
                  className='form-control'
                  onChange={(e) => settopicsCovered(e.target.value)}
                />
                <div className='mt-3'>
                  <button type='submit' className='btn btn-primary'>
                    Add Internship!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternshipModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Part3.css';

const Part3 = (props) => {
  const [userCount, setuserCount] = useState(0);

  const getallUsers = () => {
    axios
      .get('/api/allusers')
      .then((res) => {
        console.log(res.data);
        setuserCount(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getallUsers();
  }, []);

  return (
    <div className='part3'>
      <div className='questions'>
        Questions
        <p>{props.questions.questions.length}</p>
      </div>
      <div className='members'>
        Members
        <p> {userCount} </p>
      </div>
      <div className='most-used-tags'>
        <h4>MOST USED TAGS</h4>
        <div className='tag tag-q'>business</div>
        <div className='tag tag-q'>science</div>
        <div className='tag tag-q'>technology</div>
      </div>
      <div className='hot-questions'>
        <h4>HOT QUESTIONS</h4>
        <p>What is business?? What is business?? What is business??</p>
        <p>What is business??</p>
        <p>What is business??</p>
      </div>
      <div className='top-users'>
        <h4>TOP USERS (POINTS)</h4>
        <div>1. Yash Parmar (2888)</div>
        <div>2. Ayan Adhya (2098)</div>
        <div>3. Viranch Patel (28)</div>
      </div>
      <div className='top-users'>
        <h4>TOP USERS (QUESTIONS)</h4>
        <div>1. Yash Parmar (2888)</div>
        <div>2. Ayan Adhya (2098)</div>
        <div>3. Viranch Patel (28)</div>
      </div>
      <div className='top-users'>
        <h4>TOP USERS (ANSWERS)</h4>
        <div>1. Yash Parmar (2888)</div>
        <div>2. Ayan Adhya (2098)</div>
        <div>3. Viranch Patel (28)</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    questions: state.question,
  };
};

export default connect(mapStateToProps)(Part3);

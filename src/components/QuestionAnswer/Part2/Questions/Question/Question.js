import React from 'react';

import './Question.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const question = (props) => (
    <div className = "question">
        <div className = "detail">
            <h2 className = "title">What is Business??</h2>
            <h3 className = "description">I want to know about business process.</h3>
            <div className = "tags">
                <div className = "tag-q">business</div>
                <div className = "tag-q">Science</div>
            </div>
            <p><b>Yash Parmar</b> Asked  on 06/07/2020</p>
            <p><b>View all <i className='fa fa-arrow-right'></i></b></p>
        </div>
        <div className = "info">
            <div className = "sub"><p>100</p>views</div>
            <div className = "sub"><p>1</p>answers</div>
            <div className = "sub"><p>1</p>votes</div>
        </div>
    </div>
);

export default question;
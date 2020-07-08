import React from 'react';

import './Question.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const question = (props) => (
    <div class = "question">
        <div class = "detail">
            <h2 class = "title">What is Business??</h2>
            <h3 class = "description">I want to know about business process.</h3>
            <div class = "tags">
                <div class = "tag-q">business</div>
                <div class = "tag-q">Science</div>
            </div>
            <p><b>Yash Parmar</b> Asked  on 06/07/2020</p>
            <p><b>View all <i class='fa fa-arrow-right'></i></b></p>
        </div>
        <div class = "info">
            <div class = "sub"><p>100</p>views</div>
            <div class = "sub"><p>1</p>answers</div>
            <div class = "sub"><p>1</p>votes</div>
        </div>
    </div>
);

export default question;
import React from 'react';

import './Part2.css';

import Questions from './Questions/Questions';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const part2 = (props) => (
    <div className = "part2">
        <div className = "head">
            <h1 className = "heading">All Questions</h1>
            <div className = "filter">
                 Filter By <select className = "options"><option>Select Categories</option></select>
            </div>
        </div>
        <div className = "filter2">
            <h3 className="filt">Latest</h3>
            <h3 className="filt">Votes</h3>
            <h3 className="filt">Unanswered</h3>
            <div className = "perpage">Questions Per Page: <select className = "ques"><option>12</option></select></div>
        </div>
        <Questions />
    </div>
);

export default part2;
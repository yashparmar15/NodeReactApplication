import React from 'react';

import './Part2.css';

import Questions from './Questions/Questions';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const part2 = (props) => (
    <div class = "part2">
        <div class = "head">
            <h1 class = "heading">All Questions</h1>
            <div class = "filter">
                 Filter By <select class = "options"><option>Select Categories</option></select>
            </div>
        </div>
        <div class = "filter2">
            <h3 class="filt">Latest</h3>
            <h3 class="filt">Votes</h3>
            <h3 class="filt">Unanswered</h3>
            <div class = "perpage">Questions Per Page: <select class = "ques"><option>12</option></select></div>
        </div>
        <Questions />
    </div>
);

export default part2;
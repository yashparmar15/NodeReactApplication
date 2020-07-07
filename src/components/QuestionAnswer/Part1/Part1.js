import React from 'react';

import './Part1.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const part1 = (props) => (
    <div class = "part1">
            <button class = "askButton" ><i class = "fa fa-plus" aria-hidden="true"/>ASK A QUESTION</button>
            <div class = "category">
                <button class = "category-btn"><i class = "fa fa-question" aria-hidden="true"/>Questions</button>
                <button class = "category-btn"><i class = "fa fa-tag" aria-hidden="true"/>Tags</button>
                <button class = "category-btn"><i class = "fa fa-trophy" aria-hidden="true"/>Badges</button>
                <button class = "category-btn"><i class = "fa fa-list-alt" aria-hidden="true"/>Categories</button>
                <button class = "category-btn"><i class = "fa fa-users" aria-hidden="true"/>Users</button>
            </div>
            <div class = "terms">
                <p>©2020 <br/><b>Terms & Privacy</b></p>
            </div>
    </div>
);

export default part1;
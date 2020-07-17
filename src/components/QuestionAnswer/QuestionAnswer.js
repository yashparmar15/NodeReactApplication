import React from 'react';

import './QuestionAnswer.css';

import Part1 from '../QuestionAnswer/Part1/Part1';

import Part2 from '../QuestionAnswer/Part2/Part2';

import Part3 from '../QuestionAnswer/Part3/Part3';

const questionAnswer = (props) => (
  <div className='main'>
    <Part1 />
    <Part2 />
    <Part3 />
  </div>
);

export default questionAnswer;

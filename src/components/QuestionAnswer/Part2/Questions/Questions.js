import React, { useState } from 'react';
import { connect } from 'react-redux';

import Question from './Question/Question';
import Loader from '../../../../assets/loaders/svg-loaders/oval.svg';
import './Questions.css';

function Questions(props) {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  const onChangeT = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const onChangeN = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  function Filter(Q) {
    if (
      title !== null &&
      Q.title.toLowerCase().indexOf(title.toLowerCase()) === -1
    ) {
      return null;
    } else if (
      name !== null &&
      Q.askedBy.username.toLowerCase().indexOf(name.toLowerCase()) === -1
    ) {
      return null;
    } else {
      return (
        <div className=''>
          <Question
            title={Q.title}
            description={Q.description}
            answers={Q.answers}
            id={Q._id}
            totalanswers={Q.answers.length}
            askedBy={Q.askedBy}
            date={Q.date}
            allTags={Q.tags}
            upvotes={Q.upvotes}
            downvotes={Q.downvotes}
          />
        </div>
      );
    }
  }

  return (
    <>
      {props.questions.questionLoading && (
        <img src={Loader} className='questionLoader' alt='loader' />
      )}

      <div className='mt-3'>
        {!props.questions.questionLoading && (
          <div className='ml-3'>
            <label htmlFor='title-filter'>Filter by Question:</label>
            <input
              type='text'
              className='form-control w-75'
              id='title-filter'
              onChange={onChangeT}
            />
            <label className='mt-2' htmlFor='name-filter'>
              Filter by Name:
            </label>
            <input
              type='text'
              id='name-filter'
              className='form-control w-75'
              onChange={onChangeN}
            />
          </div>
        )}
        {props.questions.questions.map((Q) => (
          <span key={Q._id}>{Filter(Q)}</span>
        ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.question,
  };
};

export default connect(mapStateToProps)(Questions);

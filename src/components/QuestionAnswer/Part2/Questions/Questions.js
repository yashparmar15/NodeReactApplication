import React from 'react';
import { connect } from 'react-redux';

import Question from './Question/Question';
import Loader from '../../../../assets/loaders/svg-loaders/oval.svg';
import './Questions.css';

function Questions(props) {
  return (
    <>
      {props.questions.questionLoading && (
        <img src={Loader} className='questionLoader' alt='loader' />
      )}
      <div className=''>
        {props.questions.questions.map((Q) => (
          <span key={Q._id}>
            {' '}
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
            />{' '}
          </span>
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

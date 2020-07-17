import React from 'react';
import { connect } from 'react-redux';

import Question from './Question/Question';

function Questions(props) {
  return (
    <>
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

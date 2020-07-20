import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';
import { fetchQuestions } from '../../fullredux/actions/QuestionsAction';

function AppBuilder(props) {
  useEffect(() => {
    props.fetchQ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <QuestionAnswer />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQ: () => {
      dispatch(fetchQuestions());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    questions: state.question,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBuilder);

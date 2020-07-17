import axios from 'axios';

export const fetchQuestions = () => {
  return (dispatch) => {
    axios.get('/api/questions').then((res) => {
      console.log('reached', res.data);
      dispatch({ type: 'GET_QUESTIONS', payload: res.data });
    });
  };
};

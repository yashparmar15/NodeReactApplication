import axios from 'axios';

export const fetchInternships = () => {
  return (dispatch) => {
    axios.get('/api/internships').then((res) => {
      console.log('reached internships', res.data);
      dispatch({ type: 'GET_INTERNSHIPS', payload: res.data });
    });
  };
};

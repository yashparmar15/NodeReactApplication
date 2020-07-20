import axios from 'axios';

export const fetchProjects = () => {
  return (dispatch) => {
    axios.get('/api/projects').then((res) => {
      console.log('reached', res.data);
      dispatch({ type: 'GET_PROJECTS', payload: res.data });
    });
  };
};

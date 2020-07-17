import axios from "axios";

export const fetchUserAction = () => {
	return (dispatch) => {
		axios.get("/api/current_user").then((res) => {
			dispatch({ type: "GET_USER", payload: res.data });
		});
	};
};
export const logoutUser = () => {
  return (dispatch) => {
    axios.get('/api/logout').then((res) => {
      dispatch({ type: 'LOGOUT', payload: '' });
    });
  };
};
export const fetchUsersAction = () => {
	return (dispatch) => {
		axios.get("http://localhost:5000/user/getall").then((res) => {
			dispatch({ type: "GET_USERS", payload: res.data });
		});
	};
};

const initialState = {
  isAuthenticated: false,
  userData: {},
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userData: action.payload || {},
        isAuthenticated: action.payload ? true : false,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userData: {},
        loading: false,
      };
    default:
      return state;
  }
};

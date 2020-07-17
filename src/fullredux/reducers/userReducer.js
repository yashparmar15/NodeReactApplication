const initialState = {
    usersData : []
};
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          usersData : action.payload
        };
      default:
        return state;
    }
  };
  
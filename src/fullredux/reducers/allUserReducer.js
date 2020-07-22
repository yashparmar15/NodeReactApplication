const initialState = {
    usersData : []
};
  
  export const allUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_USERS':
        return {
          ...state,
          usersData : action.payload
        };
      default:
        return state;
    }
  };
  
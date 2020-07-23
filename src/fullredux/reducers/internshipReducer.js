const initialState = {
  internships: [],
  internshipLoading: true,
};

export const internshipReducer = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case 'GET_INTERNSHIPS':
      return {
        ...state,
        internships: action.payload,
        internshipLoading: false,
      };

    default:
      return state;
  }
};

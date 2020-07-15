const initialState = {
  questions: [],
};

export const questionReducer = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case 'GET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  questions: [],
  questionLoading: true,
};

export const questionReducer = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case 'GET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        questionLoading: false,
      };

    default:
      return state;
  }
};

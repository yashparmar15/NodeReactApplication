const initialState = {
  projects: [],
  projectLoading: true,
};

export const projectReducer = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case 'GET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        projectLoading: false,
      };

    default:
      return state;
  }
};

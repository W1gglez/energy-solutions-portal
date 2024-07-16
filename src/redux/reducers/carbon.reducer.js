const carbonReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CARBON':
      return action.payload;
    case 'CLEAR_CARBON':
      return [];
    default:
      return state;
  }
};

export default carbonReducer;

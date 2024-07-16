const costReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COST':
      return action.payload;
    case 'CLEAR_COST':
      return [];
    default:
      return state;
  }
};

export default costReducer;

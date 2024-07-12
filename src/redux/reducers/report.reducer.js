// store reports from the server
const reportReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return action.payload;
    case 'CLEAR_REPORTS':
      return [];
    default:
      return state;
  }
};

export default reportReducer;

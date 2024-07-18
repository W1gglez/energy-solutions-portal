// store assessment responses from the server
const responseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESPONSES':
      return action.payload;
    case 'CLEAR_RESPONSES':
      return {};
    default:
      return state;
  }
};

export default responseReducer;

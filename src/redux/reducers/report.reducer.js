import { combineReducers } from 'redux';

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

// store report details
const reportDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_REPORT_DETAILS':
      return action.payload;
    case 'CLEAR_REPORT_DETAILS':
      return {};

    default:
      return state;
  }
};

export default combineReducers({
  reportReducer,
  reportDetails,
});

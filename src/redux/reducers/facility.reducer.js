// store facilities from the server
const facilityReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FACILITIES':
        return action.payload;
      case 'CLEAR_FACILITIES':
        return [];
      default:
        return state;
    }
  };
  
  export default facilityReducer;
const energyUnitReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload;

    default:
      return state;
  }
};

export default energyUnitReducer;

const energyCostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ENERGY_COST':
      return action.payload;
    case 'CLEAR_ENERGY_COST':
      return [];
    default:
      return state;
  }
};

export default energyCostReducer;

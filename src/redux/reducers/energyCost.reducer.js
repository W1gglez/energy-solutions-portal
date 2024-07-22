const energyCostReducer = (
  state = {
    // electric: 0.075, natural_gas: 0.81, liquid_propane: 2.5
  },
  action
) => {
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

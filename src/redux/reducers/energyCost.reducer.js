const energyCostReducer = (
  state = {
    electric: 0.1,
    natural_gas: 0.1,
    liquid_propane: 0.056,
    gas_propane: 0.056,
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

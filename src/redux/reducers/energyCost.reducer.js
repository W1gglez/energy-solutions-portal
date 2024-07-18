const energyCostReducer = (state = [{}], action) => {
    switch (action.type) {
      case 'SET_ENERGY_COSTS':
        return action.payload;
      case 'CLEAR_ENERGY_COSTS':
        return [];
      default:
        return state;
    }
  };
  
  export default energyCostReducer;
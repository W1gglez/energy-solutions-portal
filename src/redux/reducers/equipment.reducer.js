const equipmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EQUIPMENT':
      return [...state, action.payload];
    case 'CLEAR_EQUIPMENT':
      return [];
    default:
      return state;
  }
};

export default equipmentReducer;

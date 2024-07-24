const equipmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EQUIPMENT_INV':
      return [...state, action.payload];
    case 'UPDATE_EQUIPMENT_INV':
      const updatedState = [...state];
      updatedState.splice(action.payload.i, 1, action.payload.equipment);
      return updatedState;
    case 'CLEAR_EQUIPMENT':
      return [];
    default:
      return state;
  }
};

export default equipmentReducer;

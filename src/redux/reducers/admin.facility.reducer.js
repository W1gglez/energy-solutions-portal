const AdminFacilityReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADMIN_FACILITIES':
        return action.payload;
      case 'CLEAR_FACILITIES':
        return [];
      default:
        return state;
    }
  };
  
  export default AdminFacilityReducer;
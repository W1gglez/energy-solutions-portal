// store assessment responses from the server
const responseReducer = (
  state = {
    // Rush_of_air: 'true',
    // entry_heater: { isEntryHeater: 'true', isRunning: 'false' },
    // facilityId: 4,
    // hot_water: '8',
    // inReview: true,
    // lights: { isLED: 'true', motionSensor: 'true' },
    // restroom_leaks: 'false',
    // thermostat: { isProgrammable: 'true', isProgrammed: 'false' },
    // water_heater: { tempSetting: '140', age: '10' },
  },
  action
) => {
  switch (action.type) {
    case 'SET_RESPONSES':
      return action.payload;
    case 'CLEAR_RESPONSES':
      return {};
    default:
      return state;
  }
};

export default responseReducer;

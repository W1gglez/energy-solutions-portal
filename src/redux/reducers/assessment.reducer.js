// store assessment responses from the server
const responseReducer = (
  state = {
    // Rush_of_air: 'true',
    // entry_heater: { isEntryHeater: 'false', isRunning: false },
    // hot_water: 5,
    // inReview: false,
    // lights: { isLED: 'true', motionSensor: 'true' },
    // restroom_leaks: 'false',
    // thermostat: { isProgrammable: 'true', isProgrammed: 'true' },
    // water_heater: { tempSetting: 140, age: 8 },
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

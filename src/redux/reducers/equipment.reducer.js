const equipmentReducer = (
  state = [
    {
      amps: '12.5',
      brand: undefined,
      btu: undefined,
      carbonFootprint: '0.325',
      categoryId: 1,
      costPerDay: '1.80',
      costPerMonth: 54.9,
      description: undefined,
      energyUsage: '18.000',
      hoursPerDay: '6',
      kW: undefined,
      locationId: 1,
      modelNumber: undefined,
      notes: undefined,
      qty: 1,
      serialNumber: undefined,
      typeId: 17,
      volts: '240',
      watts: undefined,
    },

    {
      amps: undefined,
      brand: undefined,
      btu: '199000',
      carbonFootprint: '1.274',
      categoryId: 2,
      costPerDay: '17.50',
      costPerMonth: 533.75,
      description: undefined,
      energyUsage: '174.964',
      hoursPerDay: '3',
      kW: undefined,
      locationId: 12,
      modelNumber: undefined,
      notes: undefined,
      qty: 1,
      serialNumber: undefined,
      typeId: 8,
      volts: undefined,
      watts: undefined,
    },

    {
      amps: '35',
      brand: 'Sampson',
      btu: undefined,
      carbonFootprint: '1.892',
      categoryId: 1,
      costPerDay: '10.47',
      costPerMonth: 319.33500000000004,
      description: undefined,
      energyUsage: '104.650',
      hoursPerDay: '13',
      kW: undefined,
      locationId: 8,
      modelNumber: undefined,
      notes: undefined,
      qty: 1,
      serialNumber: undefined,
      typeId: 12,
      volts: '230',
      watts: undefined,
    },

    {
      amps: undefined,
      brand: undefined,
      btu: undefined,
      carbonFootprint: '0.439',
      categoryId: 1,
      costPerDay: '2.43',
      costPerMonth: 74.11500000000001,
      description: undefined,
      energyUsage: '1.350',
      hoursPerDay: 18,
      kW: undefined,
      locationId: 5,
      modelNumber: undefined,
      notes: undefined,
      qty: 18,
      serialNumber: undefined,
      typeId: 9,
      volts: undefined,
      watts: '75',
    },

    {
      amps: undefined,
      brand: undefined,
      btu: undefined,
      carbonFootprint: '0.851',
      categoryId: 1,
      costPerDay: '4.71',
      costPerMonth: 143.655,
      description: undefined,
      energyUsage: '2.769',
      hoursPerDay: '13',
      kW: undefined,
      locationId: 5,
      modelNumber: undefined,
      notes: undefined,
      qty: '17',
      serialNumber: undefined,
      typeId: 19,
      volts: undefined,
      watts: '213',
    },

    {
      amps: '10',
      brand: undefined,
      btu: undefined,
      carbonFootprint: '0.694',
      categoryId: 1,
      costPerDay: '3.84',
      costPerMonth: 117.11999999999999,
      description: 'Beer Cooler',
      energyUsage: '38.400',
      hoursPerDay: '16',
      kW: undefined,
      locationId: 15,
      modelNumber: undefined,
      notes: undefined,
      qty: 1,
      serialNumber: undefined,
      typeId: 3,
      volts: '240',
      watts: undefined,
    },
  ],
  action
) => {
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

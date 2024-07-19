import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import reports from './report.reducer';
import responses from './assessment.reducer';
import categories from './categories.reducer';
import locations from './locations.reducer';
import equipmentTypes from './equip_type.reducer';
import energyUnits from './energy_units.reducer';
import equipmentInv from './equipment.reducer';
import facilities from './facility.reducer';
import carbon from './carbon.reducer';
import adminFacilities from './admin.facility.reducer';
import cost from './cost.reducer';
import energyCost from './energyCost.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  reports,
  responses,
  categories,
  locations,
  equipmentTypes,
  energyUnits,
  equipmentInv,
  facilities,
  carbon,
  adminFacilities,
  cost,
  energyCost,
});

export default rootReducer;

import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import reportSaga from './report.saga';
import categoriesSaga from './categories.saga';
import locationsSaga from './locations.saga';
import typesSaga from './equipment_type.saga';
import energyUnitsSaga from './energy_units.saga';
import facilitySaga from './facility.saga';
import energyCostSaga from './energyCost.saga';
import equipmentSaga from './equipment.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    reportSaga(),
    categoriesSaga(),
    locationsSaga(),
    typesSaga(),
    energyUnitsSaga(),
    facilitySaga(),
    energyCostSaga(),
    equipmentSaga(),
  ]);
}

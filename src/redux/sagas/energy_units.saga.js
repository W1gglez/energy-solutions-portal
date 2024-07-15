import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUnits() {
  try {
    const response = yield axios.get('/api/energy-units');
    yield put({ type: 'SET_UNITS', payload: response.data });
  } catch (err) {
    console.log('error fetching energy units', err);
  }
}

function* energyUnitsSaga() {
  yield takeLatest('FETCH_UNITS', fetchUnits);
}

export default energyUnitsSaga;

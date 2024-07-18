import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLocations() {
  try {
    const response = yield axios.get('/api/equip-location');
    yield put({ type: 'SET_LOCATIONS', payload: response.data });
  } catch (err) {
    console.log('error fetching locations', err);
  }
}

function* locationsSaga() {
  yield takeLatest('FETCH_LOCATIONS', fetchLocations);
}

export default locationsSaga;

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTypes() {
  try {
    const response = yield axios.get('/api/equip-type');
    yield put({ type: 'SET_TYPES', payload: response.data });
  } catch (err) {
    console.log('error fetching equipment types', err);
  }
}

function* typesSaga() {
  yield takeLatest('FETCH_TYPES', fetchTypes);
}

export default typesSaga;

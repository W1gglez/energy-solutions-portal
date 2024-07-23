import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addEquipment(action) {
  try {
    yield axios.post('/api/equipment', action.payload);
    yield put({
      type: 'FETCH_REPORT_DETAILS',
      payload: action.payload.reportId,
    });
  } catch (err) {
    console.log('error adding equipment', err);
  }
}

function* updateEquipment(action) {
  try {
    yield axios.put(`/api/equipment/${action.payload.id}`, action.payload);
    yield put({
      type: 'FETCH_REPORT_DETAILS',
      payload: action.payload.reportId,
    });
  } catch (err) {
    console.log('error updating equipment', err);
  }
}

function* equipmentSaga() {
  yield takeLatest('ADD_EQUIPMENT', addEquipment);
  yield takeLatest('UPDATE_EQUIPMENT', updateEquipment);
}

export default equipmentSaga;

import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// saga to get all facilities
function* fetchFacilities() {
  try {
    const facilityResponse = yield axios.get('/api/facility');
    yield put({ type: 'SET_FACILITIES', payload: facilityResponse.data });
    console.log('check facilityResponse.data', facilityResponse.data);
  } catch (error) {
    console.log('error fetching facilities', error);
  }
}

// saga to add a new facility
function* addFacility(action) {
  try {
    yield axios.post('/api/facility', action.payload);
    console.log('check addFacility action.payload', action.payload);
    yield put({ type: 'FETCH_FACILITIES' });
  } catch (error) {
    console.log('error adding new facility', error);
  }
}

// saga to delete a facility
function* deleteFacility(action) {
  try {
    console.log('in deleteFacility, check action.payload', action.payload);
    yield axios.delete(`/api/facility/${action.payload}`);
    yield put({ type: 'FETCH_REPORTS' });
  } catch (error) {
    console.log('error deleting facility', error);
  }
}

// export
function* facilitySaga() {
  yield takeLatest('FETCH_FACILITIES', fetchFacilities);
  yield takeLatest('ADD_FACILITY', addFacility);
  yield takeLatest('DELETE_FACILITY', deleteFacility);
}

export default facilitySaga;

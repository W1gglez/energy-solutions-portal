import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// saga to get all facilities
function* fetchFacilities() {
	try {
		const facilityResponse = yield axios.get('/api/facility/all');
		yield put({ type: 'SET_FACILITIES', payload: facilityResponse.data });
		console.log('check fetchFacilities', facilityResponse.data);
	} catch (error) {
		console.log('error fetching facilities', error);
	}
}

// saga to get all facilities for user
function* fetchUserFacilities() {
	try {
		const facilityResponse = yield axios.get('/api/facility');
		yield put({ type: 'SET_FACILITIES', payload: facilityResponse.data });
		console.log('check fetchUserFacilities', facilityResponse.data);
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
    yield put({ type: 'FETCH_USER_FACILITIES' });
  } catch (error) {
    console.log('error deleting facility', error);
  }
}

//saga to update a facility
function* updateFacility(action) {
	try {
		yield axios.put(`/api/facility/${action.payload.id}`, action.payload);
		yield put({ type: 'FETCH_FACILITIES' });
	} catch (error) {
    console.log('error updating facility', error);
  }
}

// export
function* facilitySaga() {
	yield takeLatest('FETCH_FACILITIES', fetchFacilities);
	yield takeLatest('FETCH_USER_FACILITIES', fetchUserFacilities);
	yield takeLatest('ADD_FACILITY', addFacility);
	yield takeLatest('DELETE_FACILITY', deleteFacility);
	yield takeLatest('UPDATE_FACILITY', updateFacility);
}

export default facilitySaga;

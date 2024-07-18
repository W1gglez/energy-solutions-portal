import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// saga to get all reports
function* fetchReports() {
  try {
    const reportResponse = yield axios.get('/api/report/all');
    yield put({ type: 'SET_REPORTS', payload: reportResponse.data });
    // console.log('check fetchReports', reportResponse.data);
  } catch (error) {
    console.log('error fetching reports', error);
  }
}

// saga to get all reports for specific user
function* fetchUserReports() {
  try {
    const reportResponse = yield axios.get('/api/report');
    yield put({ type: 'SET_REPORTS', payload: reportResponse.data });
    // console.log('check fetchUserReports', reportResponse.data);
  } catch (error) {
    console.log('error fetching reports', error);
  }
}

// saga to get carbon footprint for users facilities
function* fetchCarbonFootprint() {
  try {
    const carbonResponse = yield axios.get('/api/report/carbon-footprint');
    yield put({ type: 'SET_CARBON', payload: carbonResponse.data });
    console.log('check fetchCarbonFootprint', carbonResponse.data);
  } catch (error) {
    console.log('error fetching carbon footprint', error);
  }
}

// saga to get energy cost for users facilities
function* fetchEnergyCost() {
  try {
    const costResponse = yield axios.get('/api/report/energy-cost');
    yield put({ type: 'SET_COST', payload: costResponse.data });
    console.log('check fetchEnergyCost', costResponse.data);
  } catch (error) {
    console.log('error fetching energy cost', error);
  }
}

// saga to add a new report
function* addReport(action) {
  try {
    yield axios.post('/api/report', action.payload);
    console.log('check addReport action.payload', action.payload);
    yield put({ type: 'FETCH_REPORTS' });
  } catch (error) {
    console.log('error adding new report', error);
  }
}

// saga to delete a report
function* deleteReport(action) {
  try {
    console.log('in deleteReport, check action.payload', action.payload);
    yield axios.delete(`/api/report/${action.payload}`);
    yield put({ type: 'FETCH_REPORTS' });
  } catch (error) {
    console.log('error deleting report', error);
  }
}

// export
function* reportSaga() {
  yield takeLatest('FETCH_REPORTS', fetchReports);
  yield takeLatest('FETCH_USER_REPORTS', fetchUserReports);
  yield takeLatest('FETCH_CARBON', fetchCarbonFootprint);
  yield takeLatest('FETCH_COST', fetchEnergyCost);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('DELETE_REPORT', deleteReport);
}

export default reportSaga;

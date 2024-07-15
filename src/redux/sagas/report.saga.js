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
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('DELETE_REPORT', deleteReport);
}

export default reportSaga;

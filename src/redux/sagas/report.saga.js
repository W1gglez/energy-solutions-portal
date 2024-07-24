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

// saga to get report details for one facility
function* fetchReportDetails(action) {
  try {
    const reportDetails = yield axios.get(
      `/api/report/details/${action.payload}`
    );
    console.log(reportDetails);
    yield put({ type: 'SET_REPORT_DETAILS', payload: reportDetails.data[0] });
  } catch (error) {
    console.log('error fetching report details', error);
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

// saga to mark report as approved
function* approveReport(action) {
  try {
    console.log('in approveReport, check action.payload', action.payload);
    yield axios.put(`/api/report/${action.payload.reportId}`, action.payload);
    yield put({
      type: 'FETCH_REPORT_DETAILS',
      payload: action.payload.reportId,
    });
  } catch (error) {
    console.log('error approving report', error);
  }
}

// saga to update report notes
function* updateNotes(action) {
  try {
    console.log('in update notes saga, check action.payload', action.payload);
    yield axios.put(
      `/api/report/notes/${action.payload.reportId}`,
      action.payload
    );
    yield put({
      type: 'FETCH_REPORT_DETAILS',
      payload: action.payload.reportId,
    });
  } catch (error) {
    console.log('error updating notes', error);
  }
}

// export
function* reportSaga() {
  yield takeLatest('FETCH_REPORTS', fetchReports);
  yield takeLatest('FETCH_USER_REPORTS', fetchUserReports);
  yield takeLatest('FETCH_REPORT_DETAILS', fetchReportDetails);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('DELETE_REPORT', deleteReport);
  yield takeLatest('APPROVE_REPORT', approveReport);
  yield takeLatest('UPDATE_NOTES', updateNotes);
}

export default reportSaga;

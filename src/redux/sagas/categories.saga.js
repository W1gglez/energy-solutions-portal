import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCategories() {
  try {
    const response = yield axios.get('/api/energy-categorys');
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (err) {
    console.log('error fetching categories', err);
  }
}

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default categoriesSaga;

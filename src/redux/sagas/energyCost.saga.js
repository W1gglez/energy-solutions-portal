import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { takeLatest, put } from 'redux-saga/effects';

// saga to get all energy costs
function* fetchEnergyCosts() {
	try {
		const energyCostResponse = yield axios.get('/api/energy-cost/all');
		yield put({ type: 'SET_ENERGY_COSTS', payload: energyCostResponse.data });
		console.log('check fetchEnergyCosts', energyCostResponse.data);
	} catch (error) {
		console.log('error fetching energy costs', error);
	}
}

//saga to get all energy costs for for a report
function* fetchReportEnergyCosts(action) {
    try {
        const energyCostResponse = yield axios.get(`/api/energy-cost/${action.payload}`);
        yield put({ type: 'SET_ENERGY_COSTS', payload: energyCostResponse.data });
        console.log('check fetchReportEnergyCosts', energyCostResponse.data);
    } catch (error) {
        console.log('error fetching energy costs', error);
    }
}

// saga to add a new energy cost
function* addEnergyCost(action) {
	try {
		yield axios.post(`/api/energy-cost/`, action.payload);
		console.log('check addEnergyCost action.payload', action.payload);
		yield put({ type: 'FETCH_ENERGY_COSTS' });
	} catch (error) {
		console.log('error adding new energy cost', error);
	}
}

// saga to update a energy cost
function* updateEnergyCost(action) {
    try {
        yield axios.put(`/api/energy-cost/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_ENERGY_COSTS' });
    } catch (error) {
        console.log('error updating energy cost', error);
    }
}

// saga to delete a energy cost
function* deleteEnergyCost(action) {
    try {
        console.log('in deleteEnergyCost, check action.payload', action.payload);
        yield axios.delete(`/api/energy-cost/${action.payload}`);
        yield put({ type: 'FETCH_ENERGY_COSTS' });
    } catch (error) {
        console.log('error deleting energy cost', error);
    }
}


	function* energyCostSaga() {
		yield takeLatest('FETCH_ENERGY_COSTS', fetchEnergyCosts);
		yield takeLatest('ADD_ENERGY_COST', addEnergyCost);
        yield takeLatest('FETCH_REPORT_ENERGY_COSTS', fetchReportEnergyCosts);
        yield takeLatest('UPDATE_ENERGY_COST', updateEnergyCost);
        yield takeLatest('DELETE_ENERGY_COST', deleteEnergyCost);
	}

export default energyCostSaga;

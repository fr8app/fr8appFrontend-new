import { takeLatest, call, put } from "redux-saga/effects";
import { apiConstants as types } from "../constants/appconstants";
import { terminalBoard, terminalBoardWeather, timelineDetails, stateList } from "./api";

function* timelineDetailsSaga(action) {
  const { id, postType, version } = action;
  try {
    const result = yield call(timelineDetails, id, postType, version);
    if (result.status === 1) {
      yield put({
        type: types.API_TIMELINE_DETAILS_SUCCESS,
        result: result.result.data.data,
      });
    } else {
      yield put({
        type: types.API_TIMELINE_DETAILS_FAILED,
        result: "error",
      });
    }
  } catch (error) {
    yield put({
      type: types.API_TIMELINE_DETAILS_ERROR,
      result: "error",
    });
  }
}

function* terminalBoardSaga(action) {
  const { id } = action;
  try {
    const result = yield call(terminalBoard, id);
    if (result.status === 1) {
      yield put({
        type: types.API_TERMINAL_BOARD_SUCCESS,
        result: result.result.data.data,
      });
    } else {
      yield put({
        type: types.API_TERMINAL_BOARD_FAILED,
        result: "error",
      });
    }
  } catch (error) {
    yield put({
      type: types.API_TERMINAL_BOARD_ERROR,
      result: "error",
    });
  }
}
function* terminalBoardWeatherSaga(action) {
  const { id, lat, lng } = action;
  try {
    const result = yield call(terminalBoardWeather, id, lat, lng);
    if (result.status === 1) {
      yield put({
        type: types.API_TIMELINE_DETAILS_WEATHER_SUCCESS,
        resultWeather: result.result,
      });
    } else {
      yield put({
        type: types.API_TERMINAL_BOARD_FAILED,
        result: "error",
      });
    }
  } catch (error) {
    yield put({
      type: types.API_TERMINAL_BOARD_ERROR,
      result: "error",
    });
  }
}

function* stateListingSaga(action) {
  try {
    const result = yield call(stateList, action.payload);

    if (result.status === 1) {
      console.log(result, "action", action)
      yield put({
        type: types.API_STATE_SUCCESS,
        result: result.result.data.data,
        status: result.status,
        value: action.payload
      });
    } else {
      yield put({
        type: types.API_STATE_FAIL,
        result: "error",
      });
    }
  } catch (error) {
    yield put({
      type: types.API_STATE_ERROR,
      result: "error",
    });
  }
}
function* mySaga() {
  yield takeLatest(types.API_TIMELINE_DETAILS_LOAD, timelineDetailsSaga);
  yield takeLatest(types.API_TERMINAL_BOARD_LOAD, terminalBoardSaga);
  yield takeLatest(types.API_TERMINAL_BOARD_LOAD, terminalBoardWeatherSaga);
  yield takeLatest(types.API_STATE_LOAD, stateListingSaga);
}

export default mySaga;

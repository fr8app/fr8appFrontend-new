import { combineReducers } from "redux";
import { apiConstants as types } from "../constants/appconstants";

const initialState = {
  isLoading: false,
  timelineDetails: {},
  timelineErrorState: "",
  isTimeLineSuccess: false,
  terminalBoard: {},
  onErorr: false,
  resultWeather: [],
  stateDetails: [],
  arrayDetails: [],
  stateRegionId: {}
};

export const reducer = (state = initialState, action) => {

  function createNewarray(res) {
    console.log(res)
    let arr = []
    let newObj = {}
    for (let i in res) {
      let stateobj = res[i].regions
      let state = res[i].short_name
      let id_state = res[i]._id
      if (stateobj.length > 0) {
        for (let j in stateobj) {
          let region = stateobj[j].region_name
          let id_region = stateobj[j]._id
          newObj = {
            state: state,
            reg: region,
            state_reg: state + "-" + region,
            state_id: id_state,
            reg_id: id_region
          }
          arr.push(newObj)
        }
      }
      else {
        newObj = {
          state: state,
          reg: "",
          state_reg: state + "-" + "N/A",
          state_id: id_state,
          reg_id: null
        }
        arr.push(newObj)
      }
    }

    return arr
  }

  switch (action.type) {
    case types.CLEAR_STATE:
      return {
        ...state,
        isLoading: false,
        timelineDetails: {},
        timelineErrorState: "",
        isTimeLineSuccess: false,
      };

    // Timeline Post details
    case types.API_TIMELINE_DETAILS_LOAD:
      return {
        ...state,
        isLoading: true,
        timelineDetails: {},
        timelineErrorState: "",
        isTimeLineSuccess: false,
      };
    case types.API_TIMELINE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timelineDetails: action.result,
        isTimeLineSuccess: true,
      };
    case types.API_TIMELINE_DETAILS_WEATHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resultWeather: action.resultWeather,
      };
    case types.API_TIMELINE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        timelineDetails: {},
        timelineErrorState: "error",
        isTimeLineSuccess: false,
      };
    case types.API_TIMELINE_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        timelineDetails: {},
        timelineErrorState: "error",
        isTimeLineSuccess: false,
      };

    // terminal board details
    case types.API_TERMINAL_BOARD_LOAD:
      return { ...state, isLoading: true, onErorr: false };
    case types.API_TERMINAL_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        terminalBoard: action.result,
        onErorr: false,
      };
    case types.API_TERMINAL_BOARD_FAILED:
      return { ...state, isLoading: false, onErorr: true };
    case types.API_TERMINAL_BOARD_ERROR:
      return { ...state, isLoading: false, onErorr: true };

    //state action
    case types.API_STATE_LOAD:
      console.log(action, "action")
      return { ...state, isLoading: true, onErorr: false };
    case types.API_STATE_SUCCESS:
      let newArray = createNewarray(action.result.list)
      // console.log(newArray, "****")
      return {
        ...state,
        isLoading: false,
        stateDetails: action.result.list,
        onErorr: false,
        arrayDetails: newArray
      };
    case types.API_STATE_FAIL:
      return { ...state, isLoading: false };
    case types.API_STATE_ERROR:
      return { ...state, isLoading: false };


    //idpass
    case types.API_ID_PASS:
      console.log(action, "action")
      return {
        ...state, isLoading: true, onErorr: false,
        stateRegionId: { stateId: action.stateId, regionId: action.regionId }
      }

    //Default case
    default:
      return { ...state };
  }
};
const appReducer = combineReducers({
  reducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

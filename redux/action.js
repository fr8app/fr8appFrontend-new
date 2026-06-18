import { apiConstants as types } from "../constants/appconstants";

// Timeline Details Action
export const timelineDetailsAction = (id, postType, version) => ({
  type: types.API_TIMELINE_DETAILS_LOAD,
  id,
  postType,
  version,
});

export const handleClearStateAction = () => ({ type: types.CLEAR_STATE });

// terminal board Action
export const terminalBoardAction = (id, lat, lng) => ({
  type: types.API_TERMINAL_BOARD_LOAD,
  id,
  lat,
  lng,
});

export const stateAction = (payload) => (
  {
    type: types.API_STATE_LOAD,
    payload
  })

export const passId = (stateId, regionId) => (
  {
    type: types.API_ID_PASS,
    stateId,
    regionId
  }
)



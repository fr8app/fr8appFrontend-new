export default {
  //api url
  // baseUrl: "http://1.6.98.142:4002/api/",
  // baseUrl: "http://18.205.207.176:3000/api/v1/",
  baseUrl: "https://api.fr8.ai/api/",
  // baseUrl: "http://1.6.98.142:4000/api/",
  // baseUrl: "http://192.168.3.173:7000/api/",
  // baseUrl: "http://1.6.98.142:4000/api/",

  //media url
  // baseUrlMedia: "http://1.6.98.142:4002/",
  // baseUrlMedia: "http://18.205.207.176:3000/",
  baseUrlMedia: "https://api.fr8.ai/",
  // baseUrlMedia: "http://1.6.98.142:4000/",
  // baseUrlMedia: "http://192.168.3.173:7000/",

  privacyPolicy: "http://fr8.ai/privacy",
  // privacyPolicy: "http://1.6.98.142:4000/privacy",
  // privacyPolicy: "http://192.168.3.146:5000/privacy",
  appConstants: {
    // Timeline
    timelineAlert: "Do you want to open the post in application?",
    openInApp: "Open",
    cancel: "Cancel",
    headerTitle: {
      timeline: "FR8 | Timeline Post",
    },

    baseURL: "http://192.168.3.173:7000/", //local
    // baseURL: "http://18.205.207.176:3000/", //superlive
    // baseURL: "http://1.6.98.142:4000/api/",
    // baseUrl: "http://192.168.3.152:7000/api/",
    newsTimer: 10000,
    terminalExpandTimer: 25000,
    errorTimer: 120000,
    successTimer: 600000,
    contentLoaderTimer: 1000,
    timeZoneUsa: "-0500",
  },
};

// Api Action type constants
export const apiConstants = {
  // Clear state
  CLEAR_STATE: "CLEAR_STATE",

  // ************ TIMELINE DETAILS ************
  //Get Timeline Details
  API_TIMELINE_DETAILS_LOAD: "API_TIMELINE_DETAILS_LOAD",
  API_TIMELINE_DETAILS_SUCCESS: "API_TIMELINE_DETAILS_SUCCESS",
  API_TIMELINE_DETAILS_FAILED: "API_TIMELINE_DETAILS_FAILED",
  API_TIMELINE_DETAILS_ERROR: "API_TIMELINE_DETAILS_ERROR",

  //Get terminal Board Details
  API_TERMINAL_BOARD_LOAD: "API_TERMINAL_BOARD_LOAD",
  API_TERMINAL_BOARD_SUCCESS: "API_TERMINAL_BOARD_SUCCESS",
  API_TERMINAL_BOARD_FAILED: "API_TERMINAL_BOARD_FAILED",
  API_TERMINAL_BOARD_ERROR: "API_TERMINAL_BOARD_ERROR",

  API_TIMELINE_DETAILS_WEATHER_SUCCESS: "API_TIMELINE_DETAILS_WEATHER_SUCCESS",

  //State 
  API_STATE_LOAD: "API_STATE_LOAD",
  API_STATE_SUCCESS: "API_STATE_SUCCESS",
  API_STATE_FAIL: "API_STATE_FAIL",
  API_STATE_ERROR: "API_STATE_ERROR",

  //idpass
  API_ID_PASS: "API_ID_PASS"
};

import { apiKit, apiKitV2 } from "./apiKit";

export const timelineDetails = (id, postType, version) => {
  let url = `${version ? version : "v1"
    }/timeline/details/${id}?type=${postType}`;

  return Method.GET(url);
};
export const terminalBoard = (id) => {
  let url = `v5.3/news/list?region_id=${id}`;

  return Method.GET(url);
};
export const terminalBoardWeather = async (id, lat, lng) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
    };
    const url = await fetch(
      `https://api.weather.gov/points/${lat},${lng}`,
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data.properties.forecast;
      });
    const forcastData = await fetch(`${url}`, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
    return { status: 1, result: forcastData.properties.periods };
  } catch {
    return { status: 0, result: null };
  }
};

export const stateList = (search) => {
  console.log("search", search)
  let body = {
    "search": search
  }
  // let form = new FormData()
  // form.append("search", search)
  let url = `v5/state/areas`;
  return Method.POST(body, url);
};

const Method = {
  // Get Method
  async GET(url) {
    return await new Promise((resolve, reject) => {
      apiKit
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((result) => {
          if (result.status === 200) {
            return resolve({
              status: 1,
              result: result,
            });
          } else {
            return reject({
              status: 3,
              error: result,
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            if (
              err?.response?.status !== null &&
              err.response.status !== undefined
            ) {
              if (err.response.status == 400) {
                return reject({
                  status: 2,
                  error: err?.response?.data?.message,
                });
              } else {
                return reject({
                  status: 8,
                  error: err,
                });
              }
            }
          } else {
            return reject({
              status: 6,
              error: "Something went wrong!!",
            });
          }
        });
    });
  },

  async POST(body, url) {
    console.log(body, "body")
    const data = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: body,
    }
    return await new Promise((resolve, reject) => {
      apiKit
        .post(url, body
          //   {
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Access-Control-Allow-Origin": "*",
          //   },
          //   body: body,
          // }
        )
        .then((result) => {
          if (result.status === 200) {
            return resolve({
              status: 1,
              result: result,
            });
          } else {
            return reject({
              status: 3,
              error: result,
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            if (
              err?.response?.status !== null &&
              err.response.status !== undefined
            ) {
              if (err.response.status == 400) {
                return reject({
                  status: 2,
                  error: err?.response?.data?.message,
                });
              } else {
                return reject({
                  status: 8,
                  error: err,
                });
              }
            }
          } else {
            return reject({
              status: 6,
              error: "Something went wrong!!",
            });
          }
        });
    });
  },


};

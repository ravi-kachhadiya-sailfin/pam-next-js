import axios from "axios";
import { logOut, userAuthenticationToken, getSessionId } from "src/common/commonFunction";

const SCREENER_BASE_URL = "/screener";

export const saveInitialScreener = (lastEvent = false) => {
  var number;
  let payload;


  const feelingEmotionData = lastEvent
    ? sessionStorage.getItem("lastFeelingEmotion")?.toUpperCase()
    : sessionStorage.getItem("feelingEmotion").toUpperCase()

  switch (feelingEmotionData) {
    case "HAPPY":
      number = 6;
      break;
    case "CONTENT":
      number = 5;
      break;
    case "SAD":
      number = 1;
      break;
    case "AFRAID":
      number = 2;
      break;
    case "GUILTY":
      number = 3;
      break;
    case "ANGRY":
      number = 7;
      break;
    case "WORRIED":
      number = 2;
      break;
    case "STRESSED":
      number = 4;
      break;
    case "GRIEVING":
      number = 8;
      break;
    case "NOT_SURE":
      number = 9;
      break;
    default:
      number = 9;
      break;
  }

  if (lastEvent) {
    payload = {
      feelingEmotion: parseInt(number),
      distressLevel: sessionStorage.getItem("crntDistressScore"),
      hasTraumaticEvent: sessionStorage.getItem("lastHasTraumaticEvent") === "Yes" ? true : false,
    }
  }
  else {
    payload = {
      feelingEmotion: parseInt(number),
      distressLevel: parseInt(sessionStorage.getItem("distressLevel")),
      hasTraumaticEvent:
        sessionStorage.getItem("hasTraumaticEvent") === "Yes" ? true : false,
    }
  }

  // .post(`${SCREENER_BASE_URL}/initial`, {
  //   feelingEmotion: parseInt(number),
  //   distressLevel: parseInt(sessionStorage.getItem("distressLevel")),
  //   hasTraumaticEvent:
  //     sessionStorage.getItem("hasTraumaticEvent") === "Yes" ? true : false,
  // })

  return new Promise((resolve, reject) => {
    axios
      .post(`${SCREENER_BASE_URL}/initial`, payload,
        {
          headers: {
            SessionId: getSessionId(),
          },
        })
      .then((resp) => {
        sessionStorage.setItem('crntDistressScore', sessionStorage.getItem("distressLevel"));
        sessionStorage.setItem('lastFeelingEmotion', sessionStorage.getItem("feelingEmotion") || sessionStorage.getItem("lastFeelingEmotion"));
        sessionStorage.setItem("lastHasTraumaticEvent", sessionStorage.getItem("hasTraumaticEvent"));

        sessionStorage.setItem("sessionId", JSON.stringify(resp.data.data.sessionId));
        sessionStorage.setItem("distressLevel", 0);
        sessionStorage.setItem("hasTraumaticEvent", false);
        sessionStorage.removeItem("feelingEmotion");
        //resolve(mockData.tools);
        resolve(resp.data.data.tools);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.statusCode) {
            case 400:
            case 401:
            case 404:
              reject(error.response.data.errors[0]);
              break;
            default:
              reject("Unknown error occurred");
              break;
          }
        } else {
          reject("Network Error");
        }
      });
  });
};

export const saveInitialScreenerLoggedIn = (lastEvent = false) => {
  var number;
  let payload;

  const feelingEmotionData = lastEvent
    ? sessionStorage.getItem("lastFeelingEmotion")?.toUpperCase()
    : sessionStorage.getItem("feelingEmotion").toUpperCase()

  switch (feelingEmotionData) {
    case "HAPPY":
      number = 6;
      break;
    case "CONTENT":
      number = 5;
      break;
    case "SAD":
      number = 1;
      break;
    case "AFRAID":
      number = 2;
      break;
    case "GUILTY":
      number = 3;
      break;
    case "ANGRY":
      number = 7;
      break;
    case "WORRIED":
      number = 2;
      break;
    case "STRESSED":
      number = 4;
      break;
    case "GRIEVING":
      number = 8;
      break;
    case "NOT_SURE":
      number = 9;
      break;
    default:
      number = 9;
      break;
  }

  if (lastEvent) {
    payload = {
      feelingEmotion: parseInt(number),
      distressLevel: sessionStorage.getItem("crntDistressScore"),
      hasTraumaticEvent: sessionStorage.getItem("lastHasTraumaticEvent") === "Yes" ? true : false,
    }
  }
  else {
    payload = {
      feelingEmotion: parseInt(number),
      distressLevel: parseInt(sessionStorage.getItem("distressLevel")),
      hasTraumaticEvent:
        sessionStorage.getItem("hasTraumaticEvent") === "Yes" ? true : false,
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${SCREENER_BASE_URL}/initial`, payload,
        {
          headers: {
            Authorization: userAuthenticationToken(),
          },
        }
      )
      .then((resp) => {
        sessionStorage.setItem('crntDistressScore', sessionStorage.getItem("distressLevel"));
        sessionStorage.setItem('lastFeelingEmotion', sessionStorage.getItem("feelingEmotion") || sessionStorage.getItem("lastFeelingEmotion"));
        sessionStorage.setItem("lastHasTraumaticEvent", sessionStorage.getItem("hasTraumaticEvent") === "Yes" ? true : false);

        sessionStorage.setItem("sessionId", JSON.stringify(resp.data.data.sessionId));
        sessionStorage.setItem("distressLevel", 0);
        sessionStorage.setItem("hasTraumaticEvent", false);
        sessionStorage.removeItem("feelingEmotion");
        //resolve(mockData.tools);
        resolve(resp.data.data.tools);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.statusCode) {
            case 400:
            case 401:
            case 404:
              reject(error.response.data.errors[0]);
              break;
            case 403:
              logOut()
              reject(error.response.data.errors[0]);
              break;
            default:
              reject("Unknown error occurred");
              break;
          }
        } else {
          reject("Network Error");
        }
      });
  });
};

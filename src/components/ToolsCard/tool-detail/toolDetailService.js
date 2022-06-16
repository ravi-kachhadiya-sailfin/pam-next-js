import axios from 'axios';
import { userAuthenticationToken, logOut, getSessionId } from 'app/shared/Utils/index';

const TOOL_BASE_URL = '/tool';


export const submitDestress = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${TOOL_BASE_URL}/distress/score`, data, {
        headers: {
          Authorization: userAuthenticationToken(),
          SessionId: getSessionId(),
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.statusCode) {
            case 400:
              reject(error.response.data.errors[0].message);
              break;
            case 401:
            case 404:
              reject(error.response.data.errors[0]);
              break;
            case 403:
              logOut()
              reject(error.response.data.errors[0]);
              break;
            default:
              reject('Unknown error occurred');
              break;
          }
        } else {
          reject('Network Error');
        }
      });
  });
};

export const submitPreDestress = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${TOOL_BASE_URL}/toolPerformed`, data, {
        headers: {
          Authorization: userAuthenticationToken(),
          SessionId: getSessionId(),
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.statusCode) {
            case 400:
              reject(error.response.data.errors[0].message);
              break;
            case 401:
            case 404:
              reject(error.response.data.errors[0]);
              break;
            case 403:
              logOut()
              reject(error.response.data.errors[0]);
              break;
            default:
              reject('Unknown error occurred');
              break;
          }
        } else {
          reject('Network Error');
        }
      });
  });
};


export const submitRating = (data) => {
  //console.log("ratingf data", data);
  return new Promise((resolve, reject) => {
    axios
      .post(`${TOOL_BASE_URL}/rating`, data, {
        headers: {
          Authorization: userAuthenticationToken(),
          SessionId: getSessionId(),
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.statusCode) {
            case 400:
              reject(error.response.data.errors[0].message);
              break;
            case 401:
            case 404:
              reject(error.response.data.errors[0]);
              break;
            case 403:
              logOut()
              reject(error.response.data.errors[0]);
              break;
            default:
              reject('Unknown error occurred');
              break;
          }
        } else {
          reject('Network Error');
        }
      });
  });
};
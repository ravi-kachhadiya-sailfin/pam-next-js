import axios from 'axios';
import { userAuthenticationToken, logOut, getSessionId } from 'app/shared/Utils/index';

const HOME_BASE_URL = '/home';
const TOOLS_BASE_URL = '/tool';


export const getRecommendedTools = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${HOME_BASE_URL}/recommended/tools?perPage=6&&quickToolPage=1&&specializedToolPage=1`, {
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

export const getFavouriteTools = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${TOOLS_BASE_URL}/favorite?perPage=6&&quickToolPage=1&&specializedToolPage=1`, {
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

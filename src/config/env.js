export const PROTOCOL = process.env.REACT_APP_API_PROTOCOL;
export const DOMAIN = process.env.REACT_APP_API_DOMAIN;
export const HEADER_KEY = process.env.REACT_APP_HEADER_KEY;
export const HEADER_VALUE = process.env.REACT_APP_HEADER_VALUE;

export const API = {
  URL: `${PROTOCOL}://${DOMAIN}/`,
  HEADER_KEY: HEADER_KEY,
  HEADER_VALUE: HEADER_VALUE,
};

export default API;

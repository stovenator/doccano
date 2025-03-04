import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const baseUrl = window.location.href.split('/').slice(3, 5).join('/');
const prefix = process.env.APP_NAME || ''
const HTTP = axios.create({
  baseURL: `${prefix}/v1/${baseUrl}`,
});

export const defaultHttpClient = axios.create();
export default HTTP;

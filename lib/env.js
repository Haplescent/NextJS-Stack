/* eslint-disable no-underscore-dangle */
export default typeof window !== 'undefined' ? window.__ENV__ : process.env;

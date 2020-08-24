/* eslint-disable prettier/prettier */
function getRootUrl() {
  const port = process.env.PORT || 8000;
  const dev = process.env.NODE_ENV !== 'production';
  const ROOT_URL = dev
    ? `http://localhost:${port}`
    : `https://johnmerritt95book.herokuapp.com`;

  return ROOT_URL;
}

module.exports = getRootUrl;

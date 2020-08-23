/* eslint-disable prefer-object-spread */
import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/customer';

export const getMyBookList = (options = {}) =>
  sendRequest(
    `${BASE_PATH}/my-books`,
    Object.assign(
      {
        method: 'GET',
      },
      options
    )
  );

export const fetchCheckoutSession = ({ bookId, nextUrl }) =>
  sendRequest(`${BASE_PATH}/stripe/fetch-checkout-session`, {
    body: JSON.stringify({ bookId, nextUrl }),
  });

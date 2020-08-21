/* eslint-disable prefer-object-spread */
import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/public';

export const getChapterDetail = ({ bookSlug, chapterSlug }, options = {}) =>
  sendRequest(
    `${BASE_PATH}/get-chapter-detail?bookSlug=${bookSlug}&chapterSlug=${chapterSlug}`,
    Object.assign(
      {
        method: 'GET',
      },
      options
    )
  );

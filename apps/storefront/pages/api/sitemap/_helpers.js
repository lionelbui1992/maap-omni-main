import Prismic from 'prismic-javascript';
import brandConfig from 'config/brandConfig';
const utc = require('dayjs/plugin/utc');
import dayjs from 'dayjs';

dayjs.extend(utc);

export const getPrismicClient = () => {
    return Prismic.getApi(brandConfig.services.prismic.repositoryUrl, {
        accessToken: brandConfig.services.prismic.prismicAccessToken,
    });
};

export const formatDate = (date) => {
    return dayjs(date, { timeZone: 'Australia/Melbourne' })
        .utc()
        .format('YYYY-MM-DD');
};

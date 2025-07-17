import {CustomParamsSerializer} from 'axios';

const customParamsSerializer: CustomParamsSerializer =
    (params) => Object.entries(params).reduce((pre, [key, value]) => (value ? `${pre}&${encodeURIComponent(key)}=${value}` : pre), '');

export default customParamsSerializer;

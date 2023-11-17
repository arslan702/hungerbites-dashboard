import { useSelector } from 'react-redux';
import _, { isEqual } from 'lodash';
import moment from 'moment';

export const useIsEqualSelector = (selector) => {
    return useSelector(selector, isEqual);
};

export const checkEmailValidation = (email) => {
    return new RegExp(/[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
};

export const dateFormatter = (date, format) => {
    return moment(new Date(date)).format(format || 'MMM DD, YYYY');
};

export const isExpiredDate = (date) => {
    return moment(new Date()).isAfter(date, 'day');
};

export const generateRandomString = (length) => {
    return Math.random()
        .toString(36)
        .substring(2, length || 7);
};

export const currencyFormat = (value) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(value);
};

export const isNonEmptyArray = (arr) => _.isArray(arr) && _.get(arr, 'length');

export function replaceKeys(obj, keyToReplace) {
    if (!_.isObject(obj) || !keyToReplace) return obj;
    for (const key in keyToReplace) {
        if (obj.hasOwnProperty(key)) {
            obj[keyToReplace[key]] = obj[key];
            delete obj[key];
        }
    }
    return obj;
}

export function keysToFormatDate(obj, keys) {
    if (!_.isObject(obj)) return obj;
    const formattedObj = { ...obj };
    _.forEach(keys, (key) => {
        formattedObj[key] = dateFormatter(obj[key]);
    });
    return formattedObj;
}

export function generalApiDataFormatter(data, keysToReplace, dateFormatKeys) {
    if (!isNonEmptyArray(data)) return data;
    const formattedData = _.map(data, (obj) => {
        const updatedObj = replaceKeys(obj, keysToReplace);
        const formattedObj = keysToFormatDate(updatedObj, dateFormatKeys);
        return formattedObj;
    });
    return formattedData;
}

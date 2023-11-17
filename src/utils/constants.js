export const asyncActionType = (type) => ({
    PENDING: `${type} - Pending`,
    SUCCESS: `${type} - Success`,
    ERROR: `${type} - Error`
});

export const ACTIONS = {
    ENQUEUE_SNACKBAR: '[KT_ADMIN]ENQUEUE_SNACKBAR',
    CLOSE_SNACKBAR: '[KT_ADMIN]CLOSE_SNACKBAR'
};

export const FETCH_STATUS = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const ALERT_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
};

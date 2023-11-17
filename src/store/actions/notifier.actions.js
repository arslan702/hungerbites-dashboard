import { ACTIONS } from 'utils';

export const notifier = {
    open: (value) => ({
        type: ACTIONS.ENQUEUE_SNACKBAR,
        payload: value
    }),
    close: (key) => ({
        type: ACTIONS.CLOSE_SNACKBAR,
        payload: key
    }),
    remove: (key) => ({
        type: ACTIONS.REMOVE_SNACKBAR,
        payload: key
    })
};

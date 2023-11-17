import { ACTIONS } from 'utils';

export default function notifierReducer(state = { notification: null }, action) {
    switch (action.type) {
        case ACTIONS.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notification: {
                    message: action.payload.message,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: action.payload.variant
                    }
                }
            };
        case ACTIONS.CLOSE_SNACKBAR:
            return {
                ...state,
                notification: {
                    ...state.notification,
                    dismissed: true
                }
            };
        case ACTIONS.REMOVE_SNACKBAR:
            return {
                ...state,
                notification: null
            };
        default:
            return state;
    }
}

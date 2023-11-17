import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Button, useTheme } from '@mui/material';
import { notifier } from '../store/actions';

const useNotifier = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const notification = useSelector((store) => store.notifier.notification);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClose = (...args) => dispatch(notifier.close(...args));
    useEffect(() => {
        if (notification) {
            const { message, dismissed, options } = notification;
            if (dismissed) {
                closeSnackbar();
                return;
            }
            enqueueSnackbar(message, {
                ...options,
                action: (key) => (
                    <Button sx={{ color: 'white', background: 'transparent' }} onClick={() => handleClose(key)}>
                        Dismiss me
                    </Button>
                ),
                onExited: (event, key) => {
                    dispatch(notifier.remove(key));
                }
            });
        }
    }, [notification, closeSnackbar, enqueueSnackbar]);
};

export default useNotifier;

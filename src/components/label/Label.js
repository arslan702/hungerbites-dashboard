import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
//
import { StyledLabel } from './styles';

// ----------------------------------------------------------------------

const Label = (props) => {
    const { label = '', ...rest } = props;
    const updateLabel = label.toLowerCase();
    const theme = useTheme();
    return (
        <Chip
            sx={{
                borderRadius: 1,
                minWidth: 100,
                textTransform: 'capitalize',
                ...(updateLabel === ('paid' || 'fulfilled')
                    ? { bgcolor: theme.palette.primary.main }
                    : updateLabel === ('pending reciept' || 'canceled')
                    ? { bgcolor: '#E95C20' }
                    : { bgcolor: ' #FCB202' })
            }}
            label={updateLabel}
            {...rest}
        />
    );
};

export default Label;

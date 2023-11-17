import { styled } from '@mui/material/styles';
import { Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import Iconify from '../iconify';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 70,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0, 0, 0)
}));

export default function UserListToolbar({ numSelected }) {
    return (
        <StyledRoot
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'brightBlue.200'
                }),
                mt: 3
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <></>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Iconify icon="eva:trash-2-fill" color="#c62828" />
                    </IconButton>
                </Tooltip>
            ) : (
                <></>
            )}
        </StyledRoot>
    );
}

import { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Typography, Checkbox, Popover, MenuItem, Stack, Avatar } from '@mui/material';
import Table from 'components/Table';
import Iconify from 'components/iconify';
import Label from 'components/label';

import { areasList } from 'utils/data';

const TABLE_HEAD = [
    { id: 'id', label: 'Brand Id', alignRight: false },
    { id: 'totalCity', label: 'Total Cities', alignRight: false },
    { id: 'noOfAreas', label: 'Number Of Areas', alignRight: false },
    { id: 'name', label: 'Point of Contact', alignRight: false, isNumber: true },
    { id: 'activeAreas', label: 'Active Areas', alignRight: false, isNumber: true },
    { id: 'totalUnits', label: 'Total Units', alignRight: false },
    { id: 'PaymentsDue', label: 'Payments Due', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'updated', label: 'Updated', alignRight: false },
    { id: '' }
];

const TotalCities = ({ value }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);

    const handleDeleteClick = (id) => {};
    const handleEditClick = (id) => {};
    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    return (
        <>
            <Table
                tableHead={TABLE_HEAD}
                data={areasList}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody>
                    {areasList?.map((row) => {
                        const { id, totalCity, noOfAreas, avatarUrl, name, activeAreas, totalUnits, PaymentsDue, status, updated } = row;
                        const selectedRow = selected.indexOf(row.id) !== -1;
                        return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedRow}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedRow} onChange={(event) => handleClick(event, id)} />
                                </TableCell>
                                <TableCell>
                                    <Typography>{id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{totalCity}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{noOfAreas}</Typography>
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar alt={name} src={avatarUrl} />
                                        <Typography variant="subtitle2" noWrap>
                                            {name}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left">
                                    <Label label={activeAreas} color="primary" />
                                </TableCell>
                                <TableCell align="left">{totalUnits}</TableCell>
                                <TableCell align="left">{PaymentsDue}</TableCell>
                                <TableCell align="left">
                                    <Label label={status} color="primary" />
                                </TableCell>
                                <TableCell align="left">{updated}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75
                        }
                    }
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
};

export default TotalCities;

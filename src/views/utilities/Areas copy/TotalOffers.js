/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Typography, Checkbox, Popover, MenuItem, Stack, Avatar } from '@mui/material';
import Table from 'components/Table';
import Iconify from 'components/iconify';
import Label from 'components/label';

import { areasList } from 'utils/data';
import { apiDelete, apiGet, resourceUrl } from 'services';
import { generalApiDataFormatter } from 'utils/utils';

const url = resourceUrl('tradeoffer');

const TABLE_HEAD = [
    { id: 'id', label: 'Area Id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'pincode', label: 'Pin Code', alignRight: false },
    // { id: 'name', label: 'Point of Contact', alignRight: false, isNumber: true },
    // { id: 'activeAreas', label: 'Active Areas', alignRight: false, isNumber: true },
    // { id: 'totalUnits', label: 'Total Units', alignRight: false },
    // { id: 'PaymentsDue', label: 'Payments Due', alignRight: false },
    // { id: 'status', label: 'Status', alignRight: false },
    { id: 'updated', label: 'Updated', alignRight: false },
    { id: '' }
];

const keysToReplace = { updatedAt: 'updated' };
const dateFormatKeys = ['updated'];

const TotalAreas = ({ value, setCurrentRowData, areaList, setAreaList, setOpenEdit }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [currentRowId, setCurrentRowId] = useState(null);

    async function fetchAreas() {
        const data = _.get(await apiGet(url), 'data');
        const formattedData = generalApiDataFormatter(data, keysToReplace, dateFormatKeys);
        setAreaList(formattedData);
    }

    useEffect(() => {
        (async function () {
            await fetchAreas();
        })();
    }, []);

    const handleDeleteClick = async (id) => {
        setOpen(null);
        await apiDelete(url, { id: currentRowId });
        await fetchAreas();
    };
    const handleEditClick = (id) => {
        setOpen(null);
        console.log('editing');
        setOpenEdit(true);
    };
    const handleOpenMenu = (event, row) => {
        const { id } = row;
        setCurrentRowId(id);
        setCurrentRowData(row);
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
                    {areaList?.map((row) => {
                        const { id, name, pincode, updated } = row;
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
                                    <Typography>{name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{pincode}</Typography>
                                </TableCell>
                                <TableCell align="left">{updated}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
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
                <MenuItem onClick={handleEditClick}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteClick}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
};

export default TotalAreas;

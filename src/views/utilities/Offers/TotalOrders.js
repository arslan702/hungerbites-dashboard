/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Typography, Checkbox, Popover, MenuItem } from '@mui/material';
import Table from 'components/Table';
import Iconify from 'components/iconify';

import { offersList } from 'utils/data';

const TABLE_HEAD = [
    { id: 'id', label: 'Product Id', alignRight: false },
    { id: 'staringDate', label: 'Staring Date', alignRight: false },
    { id: 'productName', label: 'Product Name', alignRight: false },
    { id: 'endingDate', label: 'Ending Date', alignRight: false },
    { id: 'sellingPrice', label: 'Selling Price', alignRight: false, isNumber: true },
    { id: 'totalUnits', label: 'Total Units', alignRight: false, isNumber: true },
    { id: 'discountPercentage', label: 'Discount Percentage', alignRight: false },
    { id: 'discountedPrice', label: 'Discount Price', alignRight: false },
    { id: 'updated', label: 'Updated', alignRight: false },
    { id: '' }
];

const TotalOrders = ({ value }) => {
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
                data={offersList}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody>
                    {offersList?.map((row) => {
                        const {
                            id,
                            staringDate,
                            productName,
                            endingDate,
                            sellingPrice,
                            totalUnits,
                            discountPercentage,
                            discountedPrice,
                            updated
                        } = row;
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
                                    <Typography>{staringDate}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{productName}</Typography>
                                </TableCell>
                                <TableCell align="left">{endingDate}</TableCell>
                                <TableCell align="left">{sellingPrice}</TableCell>
                                <TableCell align="left">{totalUnits}</TableCell>
                                <TableCell align="left">{discountPercentage} %</TableCell>
                                <TableCell align="left">{discountedPrice}</TableCell>
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

export default TotalOrders;

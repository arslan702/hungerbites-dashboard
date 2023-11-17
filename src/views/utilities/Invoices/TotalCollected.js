/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Stack, Avatar, Typography, Checkbox, Popover, MenuItem, Pagination } from '@mui/material';
import Table from 'components/Table';
import _ from 'lodash';
import Label from 'components/label';
import Iconify from 'components/iconify';
import { makeStyles } from '@mui/styles';

import { apiDelete, apiGet, apiPut, resourceUrl } from 'services';
import { useEffect } from 'react';
import moment from 'moment';

const url = resourceUrl('invoice');
const collectedurl = resourceUrl('invoice/collected')

const TABLE_HEAD = [
    { id: 'id', label: 'Inv. Id', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false, isDate: true },
    { id: 'customer', label: 'Customer Email', alignRight: false, isUser: true },
    { id: 'total', label: 'Total', alignRight: false, isStatus: true },
    { id: 'due_date', label: 'Due Date', alignRight: false, isDate: true },
    { id: 'status', label: 'Payment Status', alignRight: false, isStatus: true },
    { id: '' }
];

const useRowStyles = makeStyles({
    root: ({ open }) => ({
      borderRadius: '5px'
    }),
    tableBody: {
      "& > :not(:last-child)": {
        borderBottom: "10px solid #EDF1F5",
      }
    }
  });

const TotalCollected = ({ value }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [invoice, setInvoice] = useState([]);
    const [currentRowId, setCurrentRowId] = useState(null);
    const [page, setPage] = useState(1);
    const classes = useRowStyles();

    async function fetchInvoices() {
        const data = _.get(await apiGet(collectedurl), 'data');
        setInvoice(data);
    }
    useEffect(() => {
        (async function () {
            await fetchInvoices();
        })();
    }, [])

    console.log({invoice})

    const handleDeleteClick = async () => {
        setOpen(null);
        await apiDelete(url, { id: currentRowId });
        await fetchInvoices();
    };
    const handleEditClick = async () => {
        await apiPut(`invoice/${currentRowId}`, {status: 'outstanding'});
        setOpen(null);
        await fetchInvoices();
    };
    const handleOpenMenu = (event, row) => {
        const { id } = row;
        setCurrentRowId(id);
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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10; // Number of rows to display per page

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const currentRows = !invoice?.length ? [] : invoice?.slice(start, end);

    return (
        <>
            <Table
                tableHead={TABLE_HEAD}
                data={currentRows}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody className={classes.tableBody}>
                    {currentRows?.map((row) => {
                        const { id, amount, UserAuthentication, Order, status, due_date } = row;
                        const selectedRow = selected.indexOf(row.id) !== -1;
                        return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedRow} className={classes.root}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedRow} onChange={(event) => handleClick(event, id)} />
                                </TableCell>
                                <TableCell sx={{padding: '6px 16px 6px 16px'}}>
                                    <Typography>{id}</Typography>
                                </TableCell>
                                <TableCell sx={{padding: '6px 16px 6px 16px'}}>
                                    <Typography>{moment(Order?.order_date).format('DD/MM/YYYY')}</Typography>
                                </TableCell>
                                <TableCell sx={{padding: '6px 16px 6px 16px'}}>
                                        <Typography>
                                            {UserAuthentication?.email}
                                        </Typography>
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{amount}</TableCell>
                                <TableCell sx={{padding: '6px 16px 6px 16px'}}>
                                    <Typography>{moment(due_date).format('DD/MM/YYYY')}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>
                                    <Label label={status} color="primary" />
                                </TableCell>
                                <TableCell align="right" sx={{padding: '6px 16px 6px 16px'}}>
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
                    Outstanding
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                count={Math.ceil(invoice?.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
            />
        </>
    );
};

export default TotalCollected;

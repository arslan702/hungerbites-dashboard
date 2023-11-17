/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Stack, Avatar, Typography, Checkbox, Popover, MenuItem, Pagination, Dialog } from '@mui/material';
import Table from 'components/Table';
import Label from 'components/label';
import Iconify from 'components/iconify';
import { makeStyles } from '@mui/styles';

import { apiDelete, apiGet, resourceUrl } from 'services';
import { useEffect } from 'react';
import moment from 'moment';
import OrderDetails from './OrderDetails';
import { API_URL } from 'configuration';
import axios from 'axios';

const url = resourceUrl('order');

const TABLE_HEAD = [
    { id: 'id', label: 'Order Id', alignRight: false },
    { id: 'created', label: 'Created', alignRight: false, isDate: true },
    { id: 'customer', label: 'Customer Email', alignRight: false, isUser: true },
    { id: 'tracking', label: 'Tracking Id', alignRight: false, isNumber: true },
    { id: 'amount', label: 'Amount', alignRight: false, isNumber: true },
    { id: 'reviewStatus', label: 'Status', alignRight: false, isStatus: true },
    { id: 'updated', label: 'Updated', alignRight: false, isDate: true },
    { id: 'details', label: 'Details', alignRight: false },
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

const AllOrdersTab = ({ value }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [order, setOrder] = useState([]);
    const [page, setPage] = useState(1);
    const [currentRowId, setCurrentRowId] = useState(null);
    const classes = useRowStyles();

    async function fetchOrders() {
        const data = _.get(await apiGet(url), 'data');
        setOrder(data);
    }
    useEffect(() => {
        (async function () {
            await fetchOrders();
        })();
    }, [])

    console.log({order})

    const handleDeleteClick = async() => {
        setOpen(null);
        await apiDelete(url, { id: currentRowId});
        await fetchOrders();
    };
    const handleEditClick = (status) => {
        axios.put(`${API_URL}/order/${currentRowId}`, { status: status }).then((res) => {
            // setMessage('Your order is cancelled.')
            // setOpenDialog(true);
            setOpen(null);
            fetchOrders();
          }).catch((err) => {
            console.log(err)
          })
    };

    const handleDetails = (event, row) => {
        const { id } = row;
        setCurrentRowId(id);
        setOpenDetails(true);
    }
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

    const currentRows = !order?.length ? [] : order?.slice(start, end);

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
                        const { id, tracking, order_date, total_amount, status, UserAuthentication, updatedAt } = row;
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
                                    <Typography>{order_date}</Typography>
                                </TableCell>
                                <TableCell sx={{padding: '6px 16px 6px 16px'}}>
                                        <Typography>
                                            {UserAuthentication?.email}
                                        </Typography>
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{tracking}</TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{total_amount}</TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>
                                    <Label label={status} color="primary" />
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{moment(updatedAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}} onClick={(e) => handleDetails(e, row)}>
                                    <Label label={"Order details"} sx={{ cursor: 'pointer'}} color="primary" />
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
                <MenuItem onClick={() => handleEditClick('processing')}>
                    {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
                    Processing
                </MenuItem>
                <MenuItem onClick={() => handleEditClick('shipped')}>Shipped</MenuItem>
                <MenuItem onClick={() => handleEditClick('delivered')}>Delivered</MenuItem>
                <MenuItem onClick={() => handleEditClick('cancelled')}>Cancelled</MenuItem>
                <MenuItem onClick={() => handleDeleteClick} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                count={Math.ceil(order?.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
            />
            <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
                <OrderDetails id={currentRowId} />
            </Dialog>
        </>
    );
};

export default AllOrdersTab;

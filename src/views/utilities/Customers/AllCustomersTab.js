/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { TableBody, TableRow, TableCell, Typography, Checkbox, Popover, MenuItem, Pagination } from '@mui/material';
import Table from 'components/Table';
import Label from 'components/label';
import Iconify from 'components/iconify';
import { makeStyles } from "@mui/styles";
import { apiDelete, apiGet, resourceUrl } from 'services';
import moment from 'moment';

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'registration', label: 'Registration', alignRight: false, isDate: true },
    { id: 'name', label: 'Clients Name', alignRight: false },
    { id: 'number', label: 'Phone Number', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false},
    { id: 'status', label: 'Status', alignRight: false, isStatus: true }
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

const AllCustomersTab = ({ setCustomersList, customersList, setCurrentRowData, setOpenEdit }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(1);
    const [currentRowId, setCurrentRowId] = useState(null);
    const classes = useRowStyles();

    const url = resourceUrl(`user-profile`);

    const handleEditClick = (id) => {
        setOpen(null);
        setOpenEdit(true);
    };
    const handleOpenMenu = (event, row) => {
        const { id } = row;
        setCurrentRowData(row);
        setOpenEdit(true);
        // setCurrentRowId(id);
        // setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    async function fetchCustomers() {
        const data = _.get(await apiGet(url), 'data');
        console.log({ data });
        setCustomersList(data);
    }
    useEffect(() => {
        (async function () {
            await fetchCustomers();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteClick = async () => {
        setOpen(null);
        await apiDelete(url, { id: currentRowId });
        await fetchProducts();
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

    const currentRows = customersList?.slice(start, end);

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
                        const { id, updatedAt, name, contactNumber, email, address, status } = row;
                        const selectedRow = selected.indexOf(row.id) !== -1;
                        return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedRow} className={classes.root}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedRow} onChange={(event) => handleClick(event, id)} />
                                </TableCell>
                                <TableCell sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>
                                    <Typography>{id}</Typography>
                                </TableCell>
                                <TableCell sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>
                                    <Typography>{moment(updatedAt).format('DD/MM/YYYY')}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>{name}</TableCell>
                                <TableCell align="left" sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>{contactNumber}</TableCell>
                                <TableCell align="left" sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>{email}</TableCell>
                                <TableCell align="left" sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>{address}</TableCell>
                                <TableCell align="left" sx={{cursor: 'pointer', padding: '6px 16px 6px 16px'}} onClick={(e) => handleOpenMenu(e, row)}>
                                    <Label label={!status ? 'active' : status} sx={{color: 'white', backgroundColor: `${status == 'active' ? '#1A9890' : '#9B2915'}`}} />
                                </TableCell>
                                {/* <TableCell align="right">
                                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                    </IconButton>
                                </TableCell> */}
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
            <Pagination
                sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                count={Math.ceil(customersList?.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
            />
        </>
    );
};

export default AllCustomersTab;

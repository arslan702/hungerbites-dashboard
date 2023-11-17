/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import {
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Checkbox,
    Popover,
    MenuItem,
    Pagination
} from '@mui/material';
import Table from 'components/Table';
import { makeStyles } from '@mui/styles';
import Iconify from 'components/iconify';
import { apiDelete, apiGet, resourceUrl } from 'services';

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Item Name', alignRight: false, isDate: true },
    { id: 'amount', label: 'Price', alignRight: false },
    { id: 'expense_date', label: 'Buying Date', alignRight: false },
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

const AllExpensesTab = ({ setExpense, expense, setCurrentRowData, setOpenEdit }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [currentRowId, setCurrentRowId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const classes = useRowStyles();

    const url = resourceUrl(`expense`);

    const handleEditClick = (id) => {
        setOpen(null);
        setOpenEdit(true);
    };
    const handleOpenMenu = (event, row) => {
        const { id } = row;
        setCurrentRowData(row);
        setCurrentRowId(id);
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    async function fetchExpense() {
        const data = _.get(await apiGet(url), 'data');
        console.log({ data });
        setExpense(data);
        // setTotalProducts(data?.pagination?.totalPages);
    }

    useEffect(() => {
        (async function () {
            await fetchExpense();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    console.log({ totalProducts });

    const handleDeleteClick = async () => {
        setOpen(null);
        await apiDelete('expense', { id: currentRowId });
        await fetchExpense();
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
                data={expense}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody className={classes.tableBody}>
                    {expense?.map((row) => {
                        const { id, item_name, amount, expense_date } = row;
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
                                    <Typography>{item_name}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{amount}</TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{expense_date}</TableCell>
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
                    Edit
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteClick}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                count={expense?.length}
                page={page}
                onChange={(e, value) => setPage(value)}
            />
        </>
    );
};

export default AllExpensesTab;

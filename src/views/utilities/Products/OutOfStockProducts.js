/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Typography, Checkbox, Popover, MenuItem, Pagination } from '@mui/material';
import Table from 'components/Table';
import Iconify from 'components/iconify';

import { apiDelete, resourceUrl } from 'services';
import axios from 'axios';
import { API_ROOT } from 'configuration';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

const url = resourceUrl(`product`);

const TABLE_HEAD = [
    { id: 'id', label: 'Product Id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false, isDate: true },
    { id: 'category', label: 'Category', alignRight: false, isUser: true },
    { id: 'subCategory', label: 'Sub Category', alignRight: false, isStatus: true },
    { id: 'brand', label: 'Brand', alignRight: false, isNumber: true },
    { id: 'price', label: 'Price', alignRight: false, isNumber: true },
    { id: 'updated', label: 'Updated', alignRight: false, isDate: true },
    { id: '' }
];

const useRowStyles = makeStyles({
    root: ({ open }) => ({
        borderRadius: '5px'
    }),
    tableBody: {
        '& > :not(:last-child)': {
            borderBottom: '10px solid #EDF1F5'
        }
    }
});

const OutOfStockProducts = ({ value, outStock, setOutStock, setCurrentRowData, setOpenEdit }) => {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [currentRowId, setCurrentRowId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const classes = useRowStyles();

    function fetchProducts() {
        axios.get(`${API_ROOT}/product/outstock?page=${page}`).then((res) => {
            setOutStock(res?.data?.products);
            setTotalProducts(res?.data?.pagination?.totalPages);
        });
    }

    useEffect(() => {
        (async function () {
            await fetchProducts();
        })();
    }, [page]);

    const handleDeleteClick = async () => {
        setOpen(null);
        await apiDelete(url, { id: currentRowId });
        await fetchProducts();
    };
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
                data={outStock}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody className={classes.tableBody}>
                    {outStock?.map((row) => {
                        const { id, name, Category, SubCategory, Brand, price, updatedAt } = row;
                        const selectedRow = selected.indexOf(row.id) !== -1;
                        return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedRow} className={classes.root}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedRow} onChange={(event) => handleClick(event, id)} />
                                </TableCell>
                                <TableCell sx={{ padding: '6px 16px 6px 16px' }}>
                                    <Typography>{id}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '6px 16px 6px 16px' }}>
                                    <Typography>{name}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{ padding: '6px 16px 6px 16px' }}>
                                    {Category?.name}
                                </TableCell>
                                <TableCell align="left" sx={{ padding: '6px 16px 6px 16px' }}>
                                    {SubCategory?.name}
                                </TableCell>
                                <TableCell align="left" sx={{ padding: '6px 16px 6px 16px' }}>
                                    {Brand?.name}
                                </TableCell>
                                <TableCell align="left" sx={{ padding: '6px 16px 6px 16px' }}>
                                    {price}
                                </TableCell>
                                <TableCell align="left" sx={{ padding: '6px 16px 6px 16px' }}>
                                    {moment(updatedAt).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell align="right" sx={{ padding: '6px 16px 6px 16px' }}>
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
            {outStock?.length ?? (
                <Pagination
                    sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                    component="div"
                    count={totalProducts}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                />
            )}
        </>
    );
};

export default OutOfStockProducts;

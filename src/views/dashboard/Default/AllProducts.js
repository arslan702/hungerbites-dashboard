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
    Pagination,
    Box,
    CircularProgress
} from '@mui/material';
import Table from 'components/Table';
import { makeStyles } from '@mui/styles';
import Iconify from 'components/iconify';
import { apiDelete, apiGet, resourceUrl } from 'services';
import moment from 'moment';

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Product Name', alignRight: false },
    { id: 'total_units_sold', label: 'Total Units Sold', alignRight: false },
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

const AllProduct = ({ productsList }) => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const classes = useRowStyles();

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

  const rowsPerPage = 50; // Number of rows to display per page

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const currentRows = !productsList?.length ? [] : productsList?.slice(start, end);

    return (
        <>
        {!productsList?.length ?
        <Box sx={{width: '200px', height: '150px', alignContent: 'center'}}>
          <center><CircularProgress/></center>
        </Box>  :
        <>
            <Table
                tableHead={TABLE_HEAD}
                data={currentRows}
                // handleDeleteClick={handleDeleteClick}
                showActions
                selected={selected}
                setSelected={setSelected}
            >
                <TableBody className={classes.tableBody}>
                    {currentRows?.map((row) => {
                        const { id, name, order_count } = row;
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
                                    <Typography>{name}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{padding: '6px 16px 6px 16px'}}>{order_count}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                count={Math.ceil(productsList?.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
            />
            </>
            }
        </>
    );
};

export default AllProduct;

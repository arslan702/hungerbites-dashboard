/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, TableContainer, Popover, MenuItem, TableBody, TableCell, Typography, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableListToolbar from './TableListToolbar';
import Head from './Head';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = [] || array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        // return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis?.map((el) => el[0]);
}

const Table = (props) => {
    const { tableHead, data, selected, setSelected, children } = props;

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data?.map((n) => n?.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const filteredData = applySortFilter(data, getComparator(order, orderBy), filterName);
    const isNotFound = !filteredData?.length && !!filterName;

    return (
        <>
            {!!selected?.length && (
                <TableListToolbar numSelected={selected?.length} filterName={filterName} onFilterName={handleFilterByName} />
            )}
            <TableContainer component={Paper} sx={{ mt: 5 }}>
                <MuiTable>
                    <Head
                        // order={order}
                        // orderBy={orderBy}
                        headLabel={tableHead}
                        rowCount={data?.length}
                        numSelected={selected?.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    {children}
                    {isNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <Paper
                                        sx={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography variant="h6" paragraph>
                                            Not found
                                        </Typography>

                                        <Typography variant="body2">
                                            No results found for &nbsp;
                                            <strong>&quot;{filterName}&quot;</strong>.
                                            <br /> Try checking for typos or using complete words.
                                        </Typography>
                                    </Paper>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </MuiTable>
            </TableContainer>
        </>
    );
};

export default Table;

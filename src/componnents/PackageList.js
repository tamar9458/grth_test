import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPackage, deletePackage, searchValue, searchStatus } from "../service/packageServices";
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
    ,  MenuItem, InputLabel, Box, Select
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { red, blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import React from 'react';
import '../App.css'

const PackageList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { packages } = useSelector(state => state.pack)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState(null)
    const [allPackages, setAllPackages] = useState(packages.length)
    const [packsCollected, setPacksCollected] = useState(packages.filter(x => x.collected).length)

    useEffect(() => {
        setAllPackages(packages.length)
        setPacksCollected(packages.filter(x => x.collected).length)
    })

    const editHandle = (pack) => {
        dispatch(editPackage(pack, navigate))
        setPacksCollected(packages.filter(x => x.collected).length)
    }

    const deletePackageHandler = (pack) => {
        Swal.fire({
            title: "Delete Package",
            text: "Are you sure you want to delete this package?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: blue[500],
            cancelButtonColor: red[500],
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePackage(pack, navigate));
                setAllPackages(packages.length)
            }
        })
    }

    return (
        <><div className="list">
            <br></br>
            <div className="top">
                <Button onClick={() => navigate('/add')} variant="outlined"
                    color="primary">Add Package</Button>
                <TextField type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }} />

                <InputLabel id="d">filter by status</InputLabel>
                <Select labelId="d" id="d" style={{ width: '20%', marginLeft: '10%' }}
                    value={filterStatus} label="Age" onChange={(e) => setSearch(e.target.value)}>
                    <MenuItem value={null}>reset</MenuItem>
                    <MenuItem value={true}>collect</MenuItem>
                    <MenuItem value={false}>not collect</MenuItem>
                </Select>

            </div>
            <h2 style={{ width: '40%', marginLeft: '10%' }}>Your Packages: </h2>
            <h3> Packages: {allPackages} Collected: {packsCollected}</h3>
            <TableContainer component={Paper} style={{ width: '80%', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Tracking number</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Options</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packages?.map((pack) => (filterStatus === null || searchStatus(pack, filterStatus))
                            && (!search || searchValue(pack, search)) ? (
                            <TableRow key={pack?.name}>
                                <TableCell style={{ fontSize: '16px' }}>{pack?.name}</TableCell>
                                <TableCell style={{ fontSize: '16px' }}>{pack?.trackingNumber}</TableCell>
                                <TableCell  >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button startIcon={<EditIcon />} onClick={() => { editHandle(pack) }} variant="outlined" color="secondary" >{pack?.collected ? 'Mark not collect' : 'Mark collect'}</Button>
                                        <Button startIcon={<ListOutlinedIcon />} onClick={() => navigate('detail', { state: pack })} variant="outlined" color="secondary" >Details</Button>
                                        <Button startIcon={<DeleteIcon />} onClick={() => { deletePackageHandler(pack, navigate) }} variant="outlined" color="secondary" >Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : null)}
                    </TableBody>
                </Table>
            </TableContainer >
        </div></>
    );
}
export default PackageList;
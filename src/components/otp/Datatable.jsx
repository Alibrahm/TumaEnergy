import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import moment from 'moment';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border 
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SearchBox = ({value,onChange}) => (
  <input type="text" placeholder="Search" value={value} onChange={onChange} />
)


export default function Datatable() {

  const token = localStorage.getItem("token");

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const [rows,setRow] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://skiza-app-dy3qp.ondigitalocean.app/api/v1/skiza/otp/sms',{headers});
        setRow(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);


  const filteredRows = rows.filter((row) => 
  row.otp.toLowerCase().includes(searchQuery.toLowerCase()) ||
  row.contact.toLowerCase().includes(searchQuery.toLowerCase()) 
  )

  const handleSearchChange = (event) =>{
    setSearchQuery(event.target.value)
  }



  return (
    <div className="datatable">
      <div>
        <SearchBox value={searchQuery} onChange={handleSearchChange}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>OTP</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell align="center">order_id</StyledTableCell>
            {/* <StyledTableCell align="center">Description</StyledTableCell> */}
            <StyledTableCell align="center">Time Created</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.otp}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.contact}
              </StyledTableCell>
              <StyledTableCell align="center">{row.order_id}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.decription}</StyledTableCell> */}
              <StyledTableCell align="center">{ moment(row.createdAt).format('MMMM Do, YYYY, h:mm:ss a')}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.id}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}

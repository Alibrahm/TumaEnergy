import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from '@mui/styles';
import Widgets from "../widgets/Widgets";
import "./orders.scss";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  subscribed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  failed: {
    color: 'red',
  },
});


const SearchBox = ({ value, onChange }) => (
  // <input type="text" placeholder="Search..." value={value} onChange={onChange} />
  <div className="relative w-96 flex">
    <div>
      <input type="search" id="search-dropdown" className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-200 focus:border-blue-200 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Product by Account or Serial" onChange={onChange} required />
      {value != undefined && value.length != 0 ? <button className='text-black absolute right-2 bottom-1 w-28   focus:outline-none font-medium rounded-lg text-sm px-4 py-2  dark:hover:bg-[#F58426] '
        type="reset"><ClearIcon sx={{ marginTop: 2 }} /></button> : ''}

    </div>
    <button type="button" className="absolute top-0 right-0 p-3 text-sm font-medium text-white bg-[#5f6062] rounded-r-lg border border-[#5f6062] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <span className="sr-only">Search</span>
    </button>

  </div>
);

export default function Datatable() {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [rows, setRow] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://plankton-app-c2rii.ondigitalocean.app/api/skiza/list/tunes?size=${size}&page=${page}`,
          { headers }
        );
        const sortedRows = response.data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        setRow(sortedRows);
        setData(response.data)
        console.log("Response Orders",response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [page, size]);


  const filteredRows = rows.filter((row) =>
    row.tune_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const countStatus = rows.reduce((count, row) => {
    if (row.status === "OD200") {
      count.subscribed++;
    } else if (row.status === "OD201") {
      count.pending++;
    } else if (row.status === "OD400") {
      count.failed++;
    }
    return count;
  }, { subscribed: 0, pending: 0, failed: 0 })

  const classes = useStyles();

 
  
const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            padding: '2px',
            fontFamily: 'Ubuntu',
            fontWeight: 'inherit'
          },
          footer: {
            border: 0
          }
        }
      },
      //@ts-ignore
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            textAlign: 'center',
            alignItems: 'center',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {

            color: '#ffffff',
            display: "flex",
            justifyContent: "flex-start",
            // fontWeight: 'bold',
            ".&MuiCheckbox-root.Mui-checked": {
              color: 'green'
            },
          },
        },
      },
      ".&MuiButtonBase-root": {
        display: "flex",
        justifyContent: "flex-start",
      },
      ".&.MuiTypography-root": {
        fontSize: '0.989rem',
        fontFamily: 'Ubuntu',
        lineHeight: 1.1
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
              paddingLeft: '0px',
              paddingRight: '0px',
              // minHeight:'3px',
              background: 'transparent',
              marginBottom: '2px',
              marginTop: '0px',
            }
          },
          root: {
            top: 0,
            position: 'sticky',
            background: 'white',
            zIndex: '100',
          },
        }
      },
      //@ts-ignore
      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            borderRadius: '14px 0px 0px 0px',
            backgroundColor: '#5f6062',
            color: 'wh',
          },
          root: {
            "&$selected": {
              backgroundColor: "#E0E0E0",
            },
          }
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: 'relative',
            height: 'auto',
            borderRadius: '18px',
            border: '1px solid #f2f2f2',
            boxShadow: '0 0 6px 4px #efefef'
          },
        },
      },
      MUIDataTableBodyRow: {
        root: {
          height: 50, // or your desired height
          padding: '10px !important', // or your desired padding
        },
        hoverRoot: {
          '&:hover': {
            backgroundColor: 'lightgray', // or your desired hover background color
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: '0 '
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontFamily: 'Ubuntu',
            display: 'flex'
          },
          avatar: {
            paddingLeft: 14,
            fontFamily: 'Ubuntu',
          }
        },
      }
    }
  });


  const columnsample = [

    {
      // @ts-ignore
      name: "tune_code",
      label: 'Tune Code',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: ' #5f6062', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px', lineHeight: 1.8, } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: 'white', fontSize: '1.04rem', whiteSpace: 'nowrap', fontWeight: 450, lineHeight: 1.8, textAlign: "center" }}>
            {columnMeta.label}
          </th>
        ),
      }
    },
    {
      // @ts-ignore
      name: "phonenumber",
      label: 'Phone Number',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: ' #5f6062', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: 'white', fontSize: '1.04rem', whiteSpace: 'nowrap', fontWeight: 450, lineHeight: 1.8, textAlign: "center" }}>
            {columnMeta.label}
          </th>
        ),
      }
    },
    {
      // @ts-ignore
      name: "createdAt",
      label: 'Date Created',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: ' #5f6062', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: 'white', fontSize: '1.04rem', whiteSpace: 'nowrap', fontWeight: 450, lineHeight: 1.8, textAlign: "center" }}>
            {columnMeta.label}
          </th>
        ),
      }
    },

    {
      // @ts-ignore
      name: "status",
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: ' #5f6062', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: 'white', fontSize: '1.04rem', whiteSpace: 'nowrap', fontWeight: 450, lineHeight: 1.8, textAlign: "center" }}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta) =>
          value === "OD200" ? <div className="w-20 py-1 bg-[#d6f1e1] text-[#2cd34d] font-semibold font-[Ubuntu] rounded-3xl text-sm flex justify-center items-center"> Subscribed</div> :
            value == "OD201" ? <div className="w-[210px] py-1.5 bg-[#f8e7d8] text-[#F58426] font-medium rounded-3xl text-sm flex justify-center items-center"> Pending</div> :
              value == "ELIGIBLE" ? <div className="w-32 py-1.5  bg-[#FEF0C7] text-[#FDB022] font-semibold rounded-3xl text-sm flex justify-center items-center"> Eligible Lead</div> :
                value == "COMPLETE" ? <div className="w-20 py-1 bg-[#d6f1e1] text-[#2cd37f] font-medium rounded-3xl text-sm flex justify-center items-center"> Customer</div> :
                  value == "CUSTOMER" ? <div className="w-20 py-1 bg-[#d6f1e1] text-[#2cd37f] font-semibold rounded-3xl text-sm flex justify-center items-center"> Customer</div> :
                    value == "PENDING INSTALLATION" ? <div className="w-40 py-1.5  bg-[#f0f1f3] text-[#5F6062] font-medium rounded-3xl text-sm flex justify-center items-center"> Pending Installation</div> :
                      <div className="w-20 h-6   text-[#f23333] font-medium rounded-3xl text-sm flex justify-center items-center">---</div>
      }
    },


  ]

  const options = {
    filter: true,
    search: true,
    print: true,
    // download: updateChoice,
    viewColumns: true,
    customToolbar: null,
    responsive: 'standard',
    selectableRows: "none",
    serverSide: true,
    fixedHeader: true,
    pagination: true,
    rowsPerPageOptions: [],
    fixedSelectColumn: true,
    page: page,
    serverSide: true,
    count: 800,
    searchOpen: true,
    // searchText: " ",
    rowsPerPageOptions: [10, 20, 50],
    onTableChange: (action, tableState) => {
      console.log("ACTION IS !!!!", action);
      if (action === "changePage") {

        setIsLoaded(false);
        setPage(tableState.page);

      } else if (action === "changeRowsPerPage") {
        console.log("action not handled.", tableState);
        setIsLoaded(false);
        setSize(tableState.rowsPerPage);
      }
      else {
        console.log("action not handled.");
      }
    },
    enableNestedDataAccess: '.',
    elevation: 0,
    textLabels: {
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },

      setFilterChipProps: () => {
        return {
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    }
  }

  return (

    <div className="datatable">
      <div className="widgetwrappertable" style={{display:'flex',justifyContent:'center'}}>

        <Widgets
          type="subscribed"
          widgetProps={countStatus.subscribed}
        />
        <Widgets
          type="pending"
          widgetProps={countStatus.pending}
        />
        <Widgets
          type="failed"
          widgetProps={countStatus.failed}
        />
      </div>

      {/* <SearchBox value={searchQuery} onChange={handleSearchChange} /> */}

      {/* <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tune Code</StyledTableCell>
                <StyledTableCell align="center">PhoneNumber</StyledTableCell>
                <StyledTableCell align="center">Time Created</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.tune_code}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phonenumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={
                      row.status === "OD200"
                        ? classes.subscribed
                        : row.status === "OD201"
                          ? classes.pending
                          : row.status === "OD400"
                            ? classes.failed
                            : ""
                    }
                  >
                    {row.status === "OD200" && "Subscribed"}
                    {row.status === "OD201" && "Pending"}
                    {row.status === "OD400" && "Failed"}

                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
      {/* 
     
     <Box sx={{ height: 400, width: '100%' }}>
   
      </Box> */}
      <div className="mx-4 rounded-lg" style={{marginInline:'18px'}}>
        <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        columns={columnsample}
        data={data}
      options={options}

          />
          </ThemeProvider>
        </div>
    </div>
  );
}

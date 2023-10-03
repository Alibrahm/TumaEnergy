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
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';
import UploadTune from "../new/New";



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

const SearchBox = ({ value, onChange }) => (
  <input type="text" placeholder="Search..." value={value} onChange={onChange} />
);

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color:#fff;
    color: black;
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: black;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #48D1CC;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-inline:190px;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: 'inherit',
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

export default function Datatable() {

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://plankton-app-c2rii.ondigitalocean.app/api/skiza/list/tunes?page=${page}&size=${size}`);
        setRows(response.data);
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [page, size]);

  const filteredRows = rows.filter((row) =>
    row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columnsample = [

    {
      // @ts-ignore
      name: "code",
      label: 'Tune Code',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: 'black', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: '#ffffff', fontSize: '1.06rem', whiteSpace: 'nowrap', fontWeight: 500, lineHeight: 1.8, textAlign: "center" }}>
            {columnMeta.label}
          </th>
        ),
      }
    },
    {
      // @ts-ignore
      name: "name",
      label: 'Tone Name',
      options: {
        filter: true,
        sort: false,
        display: true,
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: 'black', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: '#ffffff', fontSize: '1.06rem', whiteSpace: 'nowrap', fontWeight: 500, lineHeight: 1.8, textAlign: "center" }}>
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
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: 'black', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px' } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: '#ffffff', fontSize: '1.06rem', whiteSpace: 'nowrap', fontWeight: 500, lineHeight: 1.8, textAlign: "center" }}>
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
        setCellProps: () => ({ style: { fontSize: 14, fontFamily: 'Ubuntu', color: 'black', whiteSpace: 'nowrap', fontWeight: 400, paddingLeft: '23px', lineHeight: 1.9, } }),
        // setCellHeaderProps: () => ({ style: { backgroundColor: '#5f6062', color: 'white', fontSize: '0.9rem', } }),
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ backgroundColor: '#48D1CC', color: '#ffffff', fontSize: '1.06rem', whiteSpace: 'nowrap', fontWeight: 500, lineHeight: 1.9, textAlign: "center" }}>
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
    <div className="datatable" style={{ marginInline: '22px' }}>

      <Tabs defaultValue={0}>
        <StyledTabsList>
          <StyledTab value={0}>View Tunes</StyledTab>
          <StyledTab value={1}>Upload Tunes</StyledTab>
        </StyledTabsList>

        <StyledTabPanel value={0}> <div className="mx-4 rounded-lg" style={{ marginInline: '18px' }}>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              columns={columnsample}
              data={data}
              options={options}

            />
          </ThemeProvider>
        </div></StyledTabPanel>
        <StyledTabPanel value={1}><UploadTune /></StyledTabPanel>

      </Tabs>


    </div>
  );
}
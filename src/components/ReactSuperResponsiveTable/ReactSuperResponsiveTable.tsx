import * as React from 'react';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import { Theme, useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Highlighter from 'react-highlight-words';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './SuperResponsiveTableStyle.css';

interface TablePaginationActionsProperties {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,

    newPage: number,
  ) => void;
}

function TablePaginationActions(properties: TablePaginationActionsProperties) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = properties;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box
      sx={{ flexShrink: 0, ml: 2.5 }}
      pt={2}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// https://react.christmas/2020/22
type ColumnDefinitionType<T, K extends keyof T> = {
  // key: K;
  title: string;
  width?: number;
  component: (data: T, searchWords: string | undefined) => React.ReactNode;
};

type TableHeaderProperties<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProperties<T, K>) => {
  return (
    <Thead key='super-responsive-table-head'>
      <Tr>
        {columns.map((column) => {
          return <Th key={column.title}>{column.title}</Th>;
        })}
      </Tr>
    </Thead>
  );
};

type TableRowsProperties<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  searchWords?: string;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  searchWords,
}: TableRowsProperties<T, K>) => {
  const rows = data.map((tableData, rowNumber) => {
    console.log(
      '🚀 ~ file: ReactSuperResponsiveTable.tsx ~ line 150 ~ searchWords',
      searchWords,
    );

    return (
      <Tr key={`tr-${rowNumber}-${JSON.stringify(tableData)}`}>
        {columns.map((column, index) => {
          return (
            <Td
              key={`td-${index}-${JSON.stringify(tableData)}-${column.title ?? index
                }`}
            >
              {column.component(tableData, searchWords)}

              {/* {searchWords && (
                <Highlighter
                  highlightClassName='highlighter-background'
                  searchWords={[searchWords?.toString()]}
                  autoEscape={true}
                  // textToHighlight={column.component(tableData)}
                  // textToHighlight={tableData.cases}
                  textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
                />
              )} */}
            </Td>
          );
        })}
      </Tr>
    );
  });

  return <>{rows}</>;
};

type TableProperties<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
  data: Array<T>;
  title?: string;
};

export const ReactSuperResponsiveTable = <T, K extends keyof T>({
  columns,
  data,
  title,
}: TableProperties<T, K>) => {
  const matchesSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const [search, setSearch] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterData = data.filter((item) => {
      return Object.keys(item).some((key) => {
        const value: string = (item as any)[key]; // https://stackoverflow.com/a/35209016

        // const value: string = item[key as keyof typeof item] // https://stackoverflow.com/a/54901912

        if (value != null && value != undefined) {
          return value
            .toString()
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      });
    });

    setSearch(event.target.value);
    setFilteredData(filterData);
  };

  return (
    <Paper
      elevation={5}
    // variant='outlined'
    // square
    >
      <Box
        pt={2}
        pl={1}
        pb={0}
      >
        {title && (
          <Typography
            variant='h1'
            component='div'
            gutterBottom
            letterSpacing={'-0.5px'}
          >
            {title}
          </Typography>
        )}

        <FormControl
          sx={{ my: 3 }}
          // fullWidth
          variant='filled'
          size='small'
        >
          <InputLabel htmlFor='filled-adornment-Search'>Search</InputLabel>

          <FilledInput
            id='filled-adornment-Search'
            // value={values.amount}
            // onChange={handleChange('amount')}
            startAdornment={(
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )}
            onChange={handleChangeSearch}
          />
        </FormControl>
      </Box>

      <Table key='super-responsive-table'>
        <TableHeader columns={columns} />

        <Tbody>
          <TableRows
            columns={columns}
            // data={data} // show all data
            // pagination
            // data={
            //   rowsPerPage > 0
            //     ? data.slice(
            //       page * rowsPerPage,
            //       page * rowsPerPage + rowsPerPage,
            //     )
            //     : data
            // }
            //pagination + search
            data={
              rowsPerPage > 0
                ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
                : filteredData
            }
            searchWords={search}
          />
        </Tbody>

        {/* <TableFooter>
        <TableRow>
         
        </TableRow>
      </TableFooter> */}
      </Table>

      <TablePagination
        rowsPerPageOptions={
          matchesSM ? [] : [5, 10, 25, { label: 'All', value: -1 }]
        }
        component='div'
        // colSpan={3}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
          style: {
            fontSize: 15,
          },
        }}
        labelRowsPerPage={
          matchesSM ? '' : <div style={{ fontSize: 15 }}>Rows per page</div>
        }
        labelDisplayedRows={(row) => (
          <div style={{ fontSize: 15 }}>
            {/* eslint-disable-next-line react/jsx-newline */}
            {row.from}-{row.to} of {row.count}
          </div>
        )}
        sx={{
          '& .MuiTablePagination-toolbar': {
            alignItems: 'baseline',
          },
          // bgcolor: 'red',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};

//? JS
// import React from 'react';

// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import './SuperResponsiveTableStyle.css';

// export default function TableExample({ columns, rows }) {
//    const renderRows = () => {
//       return rows.map((tableData, rowNumber) => {
//          return (
//             <Tr key={`tr-${tableData._id ?? rowNumber}`}>
//                {columns.map((column, index) => {
//                   return (
//                      <Td
//                         key={`td-${tableData._id ?? index}-${
//                            column.title ?? index
//                         }`}
//                      >
//                         {column.component(tableData)}
//                      </Td>
//                   );
//                })}
//             </Tr>
//          );
//       });
//    };

//    return (
//       <Table key="super-responsive-table">
//          <Thead key="super-responsive-table-head">
//             <Tr>
//                {columns.map((column) => {
//                   return <Th key={column.title}>{column.title}</Th>;
//                })}
//             </Tr>
//          </Thead>

//          <Tbody>{renderRows()}</Tbody>
//       </Table>
//    );
// }

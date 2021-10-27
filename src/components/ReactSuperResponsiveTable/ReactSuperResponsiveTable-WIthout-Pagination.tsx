import React from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './SuperResponsiveTableStyle.css';

// https://react.christmas/2020/22
type ColumnDefinitionType<T, K extends keyof T> = {
  // key: K;
  title: string;
  width?: number;
  component: (data: T) => React.ReactNode;

}

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>) => {
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

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>) => {
  const rows = data.map((tableData, rowNumber) => {
    return (
      <Tr key={`tr-${rowNumber}-${JSON.stringify(tableData)}`}>
        {columns.map((column, index) => {
          return (
            <Td
              key={`td-${index}-${JSON.stringify(tableData)}-${column.title ?? index
                }`}
            >
              {column.component(tableData)}
            </Td>
          );
        })}
      </Tr>
    );
  });

  return (
    <>
      {rows}
    </>
  );
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

export const ReactSuperResponsiveTable = <T, K extends keyof T>({ data, columns }: TableProps<T, K>) => {
  return (
    <Table key='super-responsive-table'>
      <TableHeader columns={columns} />

      <Tbody>
        <TableRows
          data={data}
          columns={columns}
        />
      </Tbody>

    </Table>
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
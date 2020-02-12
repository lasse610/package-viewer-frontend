import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const GenericTable = ({ columns, sortColumn, onSort, data }) => {
   return (
      <table className='table table-striped'>
         <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
         <TableBody data={data} columns={columns} />
      </table>
   );
}

export default GenericTable;
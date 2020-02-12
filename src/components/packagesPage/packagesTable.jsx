import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GenericTable from './genericTable';

export default class PackagesTable extends Component {
   columns = [
      { path: 'package', label: 'Package', content: Name => <Link to={`/packages/${Name.package}`}>{Name.package}</Link> },
      { path: 'section', label: 'Section'},
      { path: 'installed_size', label: 'Installed-Size' },
   ];

   raiseSort = path => {
      const sortColumn = { ...this.props.sortColumn };
      if (sortColumn.path === path) {
         sortColumn.order = (sortColumn.order === 'asc' ? 'desc' : 'asc');
      } else {
         sortColumn.path = path;
         sortColumn.order = 'asc';
      }

      this.props.onSort(sortColumn);
   }

   render() {
      const { packages, onSort, sortColumn } = this.props;
      return (
         <GenericTable columns={this.columns} sortColumn={sortColumn} data={packages} onSort={onSort} />
      );
   }
}
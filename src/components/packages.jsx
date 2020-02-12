import React, { Component } from "react";
import { getPackages } from "../services/packageService";
import Pagination from "./packagesPage/pagination";
import Spinner from "./packagesPage/spinner";
import { paginate } from "../utils/paginate";
import PackagesTable from "./packagesPage/packagesTable";
import _ from "lodash";
import SearchBox from "./packagesPage/searchBox";

class Packages extends Component {
  state = {
    packages: [],
    pageSize: 10,
    currentPage: 1,
    searchText: "",
    sortColumn: { path: "title", order: "asc" },
    loaded: false
  };

  componentDidMount = async () => {
    const { data: packages } = await getPackages();
    const loaded = true;
    this.setState({
      packages,
      loaded
    });
  };

  handlePageChange = page => {
    const pagesCount = Math.ceil(
      this.state.packages.length / this.state.pageSize
    );
    let currentPage = Math.min(Math.max(page, 1), pagesCount);
    this.setState({ currentPage });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, packages, sortColumn } = this.state;

    let filtered = packages;

    if (this.state.searchText) {
      filtered = filtered.filter(
        p =>
          p.package
            .toUpperCase()
            .indexOf(this.state.searchText.toUpperCase()) >= 0
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedPackages = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: paginatedPackages };
  };

  handleSearch = query => {
    this.setState({ searchText: query, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: packages } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <SearchBox
            onChange={this.handleSearch}
            value={this.state.searchText}
            total={totalCount}
          />
          <PackagesTable
            sortColumn={sortColumn}
            packages={packages}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          {!this.state.loaded && <Spinner />}
        </div>
      </div>
    );
  }
}

export default Packages;

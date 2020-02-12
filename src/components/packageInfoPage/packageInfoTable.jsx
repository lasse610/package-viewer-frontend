import React from "react";

const PackageInfoTable = ({ title, section, description, installed_size }) => (
  <table className="table table-borderless">
    <tbody>
      <tr>
        <th>Title:</th>
        <td>{title}</td>
      </tr>
      <tr>
        <th>Section:</th>
        <td>{section}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Installed-Size</th>
        <td>{installed_size}</td>
      </tr>
    </tbody>
  </table>
);

export default PackageInfoTable;

import React from "react";

const DependencyTable = ({ text, body }) => {
  return (
    <div className="col-md-6">
      <table className="table table-borderless">
        <thead className="thead-dark">
          <tr>
            <th>{text}</th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default DependencyTable;

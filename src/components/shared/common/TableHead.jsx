import React from 'react';

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} scope={header.scope} className={header.className}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
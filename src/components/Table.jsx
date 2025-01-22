import React from 'react';

const Table = ({ headers, data, actions }) => {
  return (
    <table className="table-auto w-full text-left border-collapse border border-neutral-dark font-sans">
      <thead>
        <tr className="bg-neutral-light">
          {headers.map((header, index) => (
            <th key={index} className="p-2 border border-neutral-dark text-neutral-dark">
              {header}
            </th>
          ))}
          {actions && <th className="p-2 border border-neutral-dark">Accion</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-neutral-light">
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="p-2 border border-neutral-dark text-neutral-dark">
                {cell}
              </td>
            ))}
            {actions && (
              <td className="p-2 border border-neutral-dark">
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
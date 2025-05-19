import React from 'react';
import './DataTable.css'; // Crée ce fichier pour le style

export default function DataTable({ columns, data, title }) {
  return (
    <div className="data-table">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => <th key={idx}>{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length}>No data available</td></tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.accessor]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

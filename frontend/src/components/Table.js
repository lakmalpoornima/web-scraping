import React from 'react';

export default function Table() {
  const tableHeaders = [
    'Column 1', 'Column 2', 'Column 3', 'Column 4',
    'Column 5', 'Column 6', 'Column 7', 'Column 8',
    'Column 9', 'Column 10', 'Column 11', 'Column 12'
  ];

  // Sample data for the table
  const tableData = [
    ['Data 1-1', 'Data 1-2', 'Data 1-3', 'Data 1-4', 'Data 1-5', 'Data 1-6', 'Data 1-7', 'Data 1-8', 'Data 1-9', 'Data 1-10', 'Data 1-11', 'Data 1-12'],
    ['Data 2-1', 'Data 2-2', 'Data 2-3', 'Data 2-4', 'Data 2-5', 'Data 2-6', 'Data 2-7', 'Data 2-8', 'Data 2-9', 'Data 2-10', 'Data 2-11', 'Data 2-12'],
    // Add more rows with sample data as needed
  ];

  return (
    <div className="container text-center mt-5">
      <h1>Hello Table</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

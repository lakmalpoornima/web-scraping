import React, { useState, useEffect } from 'react';

export default function Table() {
  const [items, setItems] = useState([]);

  const fetchDataFromBackend = () => {
    fetch('http://localhost:4000/items/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      console.log(items)
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Item Table</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>PId</th>
            <th>categories </th>
            <th>name_brand</th>
            <th>name_i</th>
            <th>name_j</th>
            <th>stock_status_T</th>
            <th>stock_status_C</th>
            <th>Wprice</th>
            <th>Psp</th>
            <th>Pinfo</th>
            <th>Blink</th>
            <th>img_links</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{item.PId}</td>
              <td>{item.categories}</td>
              <td>{item.name_brand}</td>
              <td>{item.name_i}</td>
              <td>{item.name_j}</td>
              <td>{item.stock_status_T}</td>
              <td>{item.stock_status_C}</td>
              <td>{item.Wprice}</td>
              <td>{item.Psp}</td>
              <td>{item.Pinfo}</td>
              <td>{item.Pinfo2}</td>
              <td>{item.Blink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function Table() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const itemsPerPage = 10;

  const fetchDataFromBackend = () => {
    fetch('http://localhost:4000/items/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    // Add code here to display a modal for editing with form fields pre-filled with item data.
  };

  const deleteItem = (itemId) => {
    // Add code here to delete the item with the specified itemId.
  };

  return (
    <div className="container text-center mt-5">
      <h1>Item Table</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>PId</th>
            <th>categories</th>
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
            <th>Action</th> {/* Added for Edit and Delete buttons */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
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
              <td>{item.Blink}</td>
              <td>{item.img_links}</td>
              <td>
                <button
                  onClick={() => openEditModal(item)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

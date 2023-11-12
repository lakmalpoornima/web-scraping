import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';

export default function Table() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    // PId: editItem.PId,
    //categories: editItem.categories,
    //name_brand: editItem.name_brand,
    // Add more fields as needed
  });

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.PId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);


  const fetchDataFromBackend = () => {
    fetch('http://localhost:4000/items/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
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

  // const openEditModal = (item) => {
  //   // setEditItem(item);
  //   // Add code here to display a modal for editing with form fields pre-filled with item data.
  // };

  const openEditModal = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
    console.log("buttn work",item)

  };

  const closeEditModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
  };

  const updateItem = async (itemId, newData) => {
    try {
      const response = await fetch(`http://localhost:4000/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      if (response.ok) {
        // Update the items state or refetch the data from the backend
        fetchDataFromBackend();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call a function to update the item with the new data
    updateItem(editItem._id, formData);
    // Close the modal
    closeEditModal();
  };

  const deleteItem = (itemId) => {
    // Add code here to delete the item with the specified itemId.
  };

 

const handleExport = async () => {
  try {
    const response = await fetch('http://localhost:4000/filesubmit/export');
    const blob = await response.blob();

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'items.xlsx';

    // Append the link to the document and trigger a click
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

  return (
    <div className="container text-center mt-5">
      <h1>Item Table</h1>

      <div>
      <input
      className='form-control'
        type="text"
        placeholder="Search..."
        
      
      />

<button className="btn btn-primary" onClick={handleExport}>
      Export Data
    </button>

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
          {filteredItems.map((item, index) => (
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
      <div>
      <Modal show={isModalOpen} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your form or additional content */}
          {editItem && (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formPId">
      <Form.Label>PId</Form.Label>
      <Form.Control
        type="text"
        name="PId"
        value={formData.PId}
        onChange={handleChange}
      /> 
    </Form.Group>
    <Form.Group controlId="formCategories">
      <Form.Label>Categories</Form.Label>
      <Form.Control
        type="text"
        name="categories"
        value={formData.categories}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>Name Brand</Form.Label>
      <Form.Control
        type="text"
        name="name_brand"
        value={formData.name_brand}
        onChange={handleChange}
      />
    </Form.Group>
    {/* Add more form fields as needed */}
    <Button variant="primary" type="submit">
      Save Changes
    </Button>
  </Form>
  )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/App.css';
import { Button, Form, Modal } from 'react-bootstrap';
import PulseLoader from "react-spinners/PulseLoader"

export default function Table() {
  const [items, setItems] = useState([]);
  
  //const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);


 

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.PId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    console.log(filteredItems)
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

//pagination 
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const npage = Math.ceil(items.length / itemsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)


function prePage() {
  if (currentPage !== 1){
    setCurrentPage (currentPage - 1)
  }
}

function changeCPage(id) {
  setCurrentPage(id);
}

function nextPage () {
  if ( currentPage !== npage ) {
    setCurrentPage (currentPage + 1)
  }
}

  const openEditModal = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
    //console.log(item)
    setFormData({
      itemId : item._id,
      PId: item.PId,
      categories: item.categories,
      name_brand: item.name_brand,
      name_i : item.name_i,
      name_j :  item.name_j,
      stock_status_T:item.stock_status_T,
      stock_status_C:item.stock_status_C,
      Wprice: item.Wprice,
      Psp:item.Psp,
      Pinfo:item.Pinfo,
      Blink:item.Blink,
      img_links:item.img_links,
      
    });

  };

  const closeEditModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async () => {
    const itemId = formData.itemId;
    try {
      const response = await fetch(`http://localhost:4000/items/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Item updated successfully
        console.log('Item updated successfully');
      } else {
        // Handle error case
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = (item) => {
    setItemIdToDelete(item);
    setShowConfirmModal(true);
    console.log("model",item)
  };
  
  const confirmDelete = async () => {
    console.log("confirm",itemIdToDelete)
    const itemId = itemIdToDelete._id
    console.log("confirm id",itemId)
    try {
      const response = await fetch(`http://localhost:4000/items/items/${itemId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Item deleted successfully
        console.log('Item deleted successfully');
        window.location.reload();
  
        // Update the state to remove the deleted item
        //setItems((prevItems) => prevItems.filter((item) => item._id !== itemIdToDelete));

      } else {
        // Handle error case
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      // Close the confirmation modal
      setShowConfirmModal(false);
    }
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

//loader spinner 
const [loading , setloading] = useState (false)
useEffect(()=> {
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },5000)
},[])
  return (
    <div className="container text-center mt-5">
      
     <h1>Item Table</h1>

<div className='row justify-content-between'>
  <div className='col-6'>
    
  <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        class="form-control mr-sm-2 mb-2"
      />
  </div>
     <div className='col-4'>
     <button className="btn btn-primary" onClick={handleExport}>
      Export Data
    </button>
      </div> 


    </div>
    <div>
      {/* pagination       */}
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? 'active' : ''}`}
              key={i}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
      </div>
      
    { loading?
      <PulseLoader color="#3684d6" className='loader' />
      : 
      
      <table className="table table-bordered table-striped">
        <thead>
          <tr >
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
  {searchTerm
    ? filteredItems.map((item, index) => (
        <tr key={item._id}>
          <td>{item.PId}</td>
       <td><div className="scrollTable">{item.categories}</div></td>
       <td>{item.name_brand}</td>
       <td>{item.name_i}</td>
       <td>{item.name_j}</td>
       <td>{item.stock_status_T}</td>
       <td>{item.stock_status_C}</td>
       <td>{item.Wprice}</td>
       <td><div className="scrollTable">{item.Psp}</div></td>
       <td ><div className="scrollTable">{item.Pinfo}</div></td>
       <td>{item.Blink}</td>
       <td><div className="scrollTable">{item.img_links}</div></td>
          <td>
            <button
              onClick={() => openEditModal(item)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(item)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    : currentItems.map((item, index) => (
        <tr key={item._id}>
          <td>{item.PId}</td>
       <td><div className="scrollTable">{item.categories}</div></td>
       <td>{item.name_brand}</td>
       <td>{item.name_i}</td>
       <td>{item.name_j}</td>
       <td>{item.stock_status_T}</td>
       <td>{item.stock_status_C}</td>
       <td>{item.Wprice}</td>
       <td><div className="scrollTable">{item.Psp}</div></td>
       <td ><div className="scrollTable">{item.Pinfo}</div></td>
       <td>{item.Blink}</td>
       <td><div className="scrollTable">{item.img_links}</div></td>
          <td>
            <button
              onClick={() => openEditModal(item)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(item)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
</tbody>

      </table>  
    }
      

      <div>
      {/* pagination       */}
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? 'active' : ''}`}
              key={i}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
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
    <Form.Group controlId="formNameBrand">
      <Form.Label>name_i</Form.Label>
      <Form.Control
        type="text"
        name="name_i"
        value={formData.name_i}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>name_j</Form.Label>
      <Form.Control
        type="text"
        name="name_j"
        value={formData.name_j}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>stock_status_T</Form.Label>
      <Form.Control
        type="text"
        name="stock_status_T"
        value={formData.stock_status_T}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>stock_status_C</Form.Label>
      <Form.Control
        type="text"
        name="stock_status_C"
        value={formData.stock_status_C}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>Wprice</Form.Label>
      <Form.Control
        type="text"
        name="Wprice"
        value={formData.Wprice}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>Psp</Form.Label>
      <Form.Control
        type="text"
        name="Psp"
        value={formData.Psp}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>Pinfo</Form.Label>
      <Form.Control
        type="text"
        name="Pinfo"
        value={formData.Pinfo}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>Blink</Form.Label>
      <Form.Control
        type="text"
        name="Blink"
        value={formData.Blink}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formNameBrand">
      <Form.Label>img_links</Form.Label>
      <Form.Control
        type="text"
        name="img_links"
        value={formData.img_links}
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
      <div>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this item?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={confirmDelete}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    </div>
  );
}

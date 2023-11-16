import React, { useState } from 'react';

export default function Form() {
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
  
    // Clear the alert after a few seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // Adjust the time as needed
  };
  
const itemdata = {
  PId: '',
  categories: '',
  name_brand: '',
  name_i: '',
  name_j: '',
  stock_status_T: '',
  stock_status_C: '',
  Wprice: '',
  Psp: '',
  Pinfo: '',
  Pinfo2: '',
  Blink: '',
  img_links: '',
}

const [formData, setFormData] = useState(itemdata);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/items/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(itemdata);
        showAlert('File submitted successfully');
      } else {
        showAlert('Failed to submit file');
      }
    } catch (error) {
      console.error('Error submitting item:', error);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h1>Item Form</h1>
      <form onSubmit={handleSubmit}>
      <div class="row">
    <div class="col">
      <div class="form-group mb-2 ">
      <label>
        PId:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="PId" 
        value={formData.PId} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      categories:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="categories" 
        value={formData.categories} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      name_brand:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="name_brand" 
        value={formData.name_brand} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      name_i:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="name_i" 
        value={formData.name_i} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      name_j:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="name_j" 
        value={formData.name_j} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      stock_status_T:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="stock_status_T" 
        value={formData.stock_status_T} 
        onChange={handleChange} />
     
      </div>
      </div>
      <div class="col">
      <div class="form-group mb-2 ">
      <label>
      stock_status_C:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="stock_status_C" 
        value={formData.stock_status_C} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      Wprice:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="Wprice" 
        value={formData.Wprice} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      Psp:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="Psp" 
        value={formData.Psp} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      Pinfo:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="Pinfo" 
        value={formData.Pinfo} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      Pinfo2:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="Pinfo2" 
        value={formData.Pinfo2} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      Blink:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="Blink" 
        value={formData.Blink} 
        onChange={handleChange} />
     
      </div>
      <div class="form-group mb-2 ">
      <label>
      img_links:
        </label>
        <input class="form-control mb-2 col-md-6"
        type="text" 
        name="img_links" 
        value={formData.img_links} 
        onChange={handleChange} />
     
      </div>
      </div>
      </div>
      
      <button type="submit" class="btn btn-primary">Submit Item</button>
    </form>
    <div className="fixed-top">
    {alertMessage && (
  <div className={`alert ${alertMessage.includes('success') ? 'alert-success' : 'alert-danger'}`}>
    {alertMessage}
  </div>
)}

    </div>
    </div>
  );
}

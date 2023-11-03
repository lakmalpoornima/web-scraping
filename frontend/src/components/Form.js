import React, { useState } from 'react';

export default function Form() {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the input values, e.g., send them to a server or process them locally
    console.log('Input 1:', inputValues.input1);
    console.log('Input 2:', inputValues.input2);
    console.log('Input 3:', inputValues.input3);
  };

  return (
    <div className="container mt-5">
      <h1>Hello Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input1">Input 1:</label>
          <input
            type="text"
            className="form-control"
            id="input1"
            name="input1"
            value={inputValues.input1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input2">Input 2:</label>
          <input
            type="text"
            className="form-control"
            id="input2"
            name="input2"
            value={inputValues.input2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input3">Input 3:</label>
          <input
            type="text"
            className="form-control"
            id="input3"
            name="input3"
            value={inputValues.input3}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

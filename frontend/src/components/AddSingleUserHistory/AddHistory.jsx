import React, { useState } from 'react';
import './AddHistory.scss';

const AddHistory = ({ columns, slug, SetOpen }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    SetOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderInput = (column) => {
    if (column.renderEditCell) {
      return column.renderEditCell({ value: formData[column.field] || "", api: { updateRowData: handleInputChange }, row: formData });
    }

    return (
      <input
        type={column.type || "text"}
        name={column.field}
        placeholder={column.headerName}
        value={formData[column.field] || ""}
        onChange={handleInputChange}
        style={{ width: '100%', height: '30px' }}
      />
    );
  };

  return (
    <div className='AddHistory'>
      <div className="modal">
        <span className="close" onClick={() => SetOpen(false)}>X</span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="OtherInputs">
            {columns.map((column) => (
              column.field !== "studentId" && (
                <div className="input-item" key={column.field}>
                  <label>{column.headerName}</label>
                  {renderInput(column)}
                </div>
              )
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHistory;

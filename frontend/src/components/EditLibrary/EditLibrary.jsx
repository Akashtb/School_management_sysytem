import React, { useEffect, useState } from 'react';
import './EditLibrary.scss';

const EditLibrary = ({ columns, slug, SetOpenEdit, selectedRow }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(selectedRow);
  }, [selectedRow]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    SetOpenEdit(false); 
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
    <div className='EditLibrary'>
      <div className="modal">
        <span className="close" onClick={() => SetOpenEdit(false)}>X</span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="OtherInputs">
            {columns?.map((column) => (
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

export default EditLibrary;

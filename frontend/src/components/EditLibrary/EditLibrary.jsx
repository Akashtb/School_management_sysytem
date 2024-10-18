import React, { useEffect, useState } from 'react';
import './EditLibrary.scss';
import { useUpdateLibraryRecordOfAStudentMutation } from '../../features/users/librarySliceApi';
import { toast } from 'react-toastify';

const EditLibrary = ({ columns, slug, setOpenEdit, selectedRow, refetch }) => {
  const [formData, setFormData] = useState({});
  const [updateRecord, { isLoading }] = useUpdateLibraryRecordOfAStudentMutation();

  useEffect(() => {
    if (selectedRow) {
      const { borrowDate, returnDate, ...rest } = selectedRow;
      setFormData({
        ...rest,
        borrowDate: borrowDate ? new Date(borrowDate).toISOString().substring(0, 10) : '',
        returnDate: returnDate ? new Date(returnDate).toISOString().substring(0, 10) : '',
      });
    }
  }, [selectedRow]);

  const handleInputChange = (e) => {
    const { name, type, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'select-one' ? value : value, 
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecord({ id: formData._id, updatedRecord: { ...formData, status: "Returned" } }).unwrap();
      refetch();
      toast.success("Succefully updated the record")
      setOpenEdit(false);
    } catch (err) {
      console.error('Failed to update the record: ', err);
      toast.error("Failed to update the record")
    }
  };

  const renderInput = ({ field, headerName, type }) => (
    <div className="input-item" key={field}>
      <label>{headerName}</label>
      <input
        type={type === 'date' ? 'date' : type}
        name={field}
        placeholder={headerName}
        checked={type === 'checkbox' ? formData[field] : undefined}
        value={type !== 'checkbox' ? formData[field] || '' : undefined}
        onChange={handleInputChange}
        style={{ width: '100%', height: '30px' }}
        required={type !== 'checkbox'}
      />
    </div>
  );

  return (
    <div className='EditLibrary'>
      <div className="modal">
        <span className="close" onClick={() => setOpenEdit(false)}>X</span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="OtherInputs">
            {columns?.map((column) => 
              column.field !== "studentId" && column.field !== "status" && renderInput(column)
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLibrary;

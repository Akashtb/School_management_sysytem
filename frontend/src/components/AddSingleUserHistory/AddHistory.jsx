import React, { useState } from 'react';
import './AddHistory.scss';
import { useCreateLibraryRecordMutation } from '../../features/users/librarySliceApi';
import { toast } from 'react-toastify';
import { useCreateFeeRecordMutation } from '../../features/users/feeSliceApi';

const AddHistory = ({ columns, slug, setOpen, refetch, id }) => {
  const [formData, setFormData] = useState({});
  const [createLibraryRecord] = useCreateLibraryRecordMutation();
  const [createFeeRecord] = useCreateFeeRecordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (slug === "Library") {
        const updatedFormData = { ...formData, status: "Borrowed" };
        await createLibraryRecord({ studentId: id, newRecord: updatedFormData }).unwrap();
        refetch();
        setOpen(false);
        toast.success('Record added successfully');
      }
      if (slug === "Fee") {
        console.log("Final FormData for Fee:", { studentId: id, ...formData });
        await createFeeRecord({ studentId: id, ...formData }).unwrap();
        refetch();
        setOpen(false);
        toast.success('Record added successfully');
      }
    } catch (error) {
      console.error("Failed to create record:", error);
      toast.error('Failed to add record');
    }
  };

  const handleInputChange = (e) => {
    console.log("Event:", e);
    if (!e || !e.target) {
      console.log("Event target is not defined");
      return;
    }
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log("Updated FormData:", { ...formData, [name]: value });
  };

  const renderInput = (column) => {
    if (column.field === "feeStatus") {
      return (
        <select
          name="feeStatus"
          onChange={handleInputChange}
          defaultValue=""
           required
        >
          <option value="" disabled>Select Status</option>
          <option value="Cleared">Cleared</option>
          <option value="Due">Due</option>
        </select>
      );
    }

    return ( 
      <input
        type={column.type || "text"}
        name={column.field}
        placeholder={column.headerName}
        value={formData[column.field] || ""}
        onChange={handleInputChange}
        style={{ width: '100%', height: '30px' }}
        required
      />
    );
  };

  return (
    <div className='AddHistory'>
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="OtherInputs">
            {columns.map((column) => (
              column.field !== "studentId" &&
              column.field !== "returnDate" && 
              column.field !== "status" &&(
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

import { useEffect, useState } from 'react';
import './EditFees.scss';
import { toast } from 'react-toastify';
import { useUpdateFeesRecordOfAStudentMutation } from '../../features/users/feeSliceApi';

const EditFee = ({ columns, slug, setOpenEdit, selectedRow ,refetch}) => {
    const [formData, setFormData] = useState({});
    const [updateFeeRecord, { isLoading, isSuccess, isError, error }] = useUpdateFeesRecordOfAStudentMutation();

    useEffect(() => {
      if (selectedRow) {
          setFormData({
              ...selectedRow,
              paymentDate: selectedRow.paymentDate ? new Date(selectedRow.paymentDate).toISOString().substring(0, 10) : '',
          });
      }
  }, [selectedRow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateFeeRecord({ feeId: formData._id, ...formData }).unwrap();
        refetch()
        setOpenEdit(false);
        toast.success("Record successfully edited");
    } catch (err) {
        console.error("Failed to update fee record:", err);
    }
};

    const handleInputChange = (e) => {
        if (!e.target) {
            console.error("Event target is undefined", e);
            return;
        }
        
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const renderInput = (column) => {
      if (column.field === "feeStatus") {
        return (
          <select
            name={column.field}
            value={formData[column.field] || ""}
            onChange={handleInputChange}
            style={{ width: '100%', height: '30px'}} 
             required
          >
            <option value="">Select Status</option>
            <option value="Cleared">Cleared</option>
            <option value="Due">Due</option>
          </select>
        );
      }
        if (column.renderEditCell) {
            return column.renderEditCell({ 
                value: formData[column.field] || "", 
                api: { updateRowData: handleInputChange }, 
                row: formData 
            });
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
        <div className='EditFee'>
            <div className="modal">
                <span className="close" onClick={() => setOpenEdit(false)}>X</span>
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

export default EditFee;

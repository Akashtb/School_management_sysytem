import React, { useEffect, useState } from 'react';
import { StudentLibrary } from '../../data';
import { useParams } from 'react-router-dom';
import SingleData from '../../components/SingleData/SingleData';
import './SingleLibrary.scss';
import AddHistory from '../../components/AddSingleUserHistory/AddHistory';
import EditLibrary from '../../components/EditLibrary/EditLibrary';

const columns = [
  { field: 'studentId', headerName: 'Student ID', width: 90 },
  {
    field: 'bookName',
    headerName: 'Book Name',
    width: 165,
    editable: true,
  },
  { 
    field: 'borrowDate',
    headerName: 'Borrow Date',
    width: 260,
    type: 'date',
    editable: true,
    valueGetter: (params) => new Date(params?.value),
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    width: 260,
    type: 'date',
    editable: true,
    valueGetter: (params) => new Date(params?.value),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    editable: true,
    renderEditCell: (params) => (
      <select
        defaultValue={params.value}
        style={{ width: '100%', height: '100%' }}
        onChange={(e) => {
          params.api.updateRowData({
            update: [{ ...params.row, status: e.target.value }],
          });
        }}
      >
        <option value="">Select</option>
        <option value="Cleared">Cleared</option>
        <option value="Due">Due</option>
      </select>
    ),
  },
];

const SingleLibrary = () => {
  const { id } = useParams();
  const [open, SetOpen] = useState(false);
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, SetData] = useState([]);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const findFeeHistory = StudentLibrary.filter(user => user.studentId === numericId);
    SetData(findFeeHistory);
  }, [id]);

  const handleEditRow = (row) => {
    setSelectedRow(row);
    SetOpenEdit(true);
  };

  return (
    <div className='SingleLibrary'>
      <div className="info">
        <h1>Student Library History</h1>
        <button onClick={() => SetOpen(true)}>Add New Fees</button>
      </div>
      <SingleData 
        slug="StudentLibrary" 
        columns={columns} 
        rows={data} 
        onEditRow={handleEditRow} // Assuming your SingleData component handles editing
      />
      {open && <AddHistory slug="Library" columns={columns} SetOpen={SetOpen} />}
      {openEdit && <EditLibrary slug="Library" columns={columns} SetOpenEdit={SetOpenEdit} selectedRow={selectedRow} />}
    </div>
  );
};

export default SingleLibrary;

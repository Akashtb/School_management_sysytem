import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleData from '../../components/SingleData/SingleData';
import './SingleLibrary.scss';
import AddHistory from '../../components/AddSingleUserHistory/AddHistory';
import EditLibrary from '../../components/EditLibrary/EditLibrary';
import { useGetAllLibraryRecordsOfAStudentQuery } from '../../features/users/librarySliceApi';

const formatDate = (date) => {
  if (!date) return ''; 
  const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

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
    valueGetter: (params) => {
      const borrowDate = new Date(params);
      return isNaN(borrowDate.getTime()) ? null : borrowDate;
    },
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    width: 260,
    type: 'date',
    editable: true,
    valueGetter: (params) => {
      const returnDate = new Date(params);
      return isNaN(returnDate.getTime()) ? null : returnDate; 
    },
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
          const newStatus = e.target.value;
          setFormData((prevData) => ({
            ...prevData,
            [params.field]: newStatus,
          }));
        }}
        required
      >
        <option value="">Select</option>
        <option value="Borrowed">Borrowed</option>
        <option value="Returned">Returned</option>
      </select>
    ),
  },
];

const SingleLibrary = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data: library = [], isLoading, error, refetch } = useGetAllLibraryRecordsOfAStudentQuery(id);
  
  useEffect(() => {
    if (error) {
      console.error('Failed to fetch library records:', error);
    }
  }, [error]);

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='SingleLibrary'>
      <div className="info">
        <h1>Student Library History</h1>
        <button onClick={() => setOpen(true)}>Add New Library</button>
      </div>
      <SingleData
        slug="Library"
        columns={columns}
        rows={library} 
        onEditRow={handleEditRow} 
        refetch={refetch}
      />
      {open && <AddHistory slug="Library" columns={columns} setOpen={setOpen} refetch={refetch} id={id} />}
      {openEdit && (
        <EditLibrary 
          slug="Library" 
          columns={columns} 
          setOpenEdit={setOpenEdit} 
          selectedRow={selectedRow} 
          refetch={refetch} 
        />
      )}
    </div>
  );
};

export default SingleLibrary;

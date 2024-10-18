import React, { useEffect, useState } from 'react';
import SingleData from '../../components/SingleData/SingleData';
import AddHistory from '../../components/AddSingleUserHistory/AddHistory';
import { useParams } from 'react-router-dom';
import { FeesHistory } from '../../data';
import './Single.scss';
import EditFee from '../../components/EditFees/EditFee';
import { useGetAllFeesRecordsOfAStudentQuery } from '../../features/users/feeSliceApi';

const columns = [
  {
    field: 'feeType',
    headerName: 'Fee Type',
    width: 165,
    editable: true,
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    type: 'date',
    width: 260,
    editable: true,
    valueGetter: (params) => {
      return new Date(params);
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 165,
    editable: true,
  },
  {
    field: 'feeStatus',
    headerName: 'Status',
    width: 100,
    editable: true,
    renderEditCell: (params) => (
      <select
        defaultValue={params.value}
        style={{ width: '100%', height: '100%' }}
        onChange={(e) => {
          const updatedRow = { ...params.row, feeStatus: e.target.value }; 
          params.api.updateRowData({ update: [updatedRow] }); 
        }}
        required
      >
        <option value="">Select</option>
        <option value="Cleared">Cleared</option>
        <option value="Due">Due</option>
      </select>
    ),
  },
  {
    field: 'remarks',
    headerName: 'Remark',
    width: 160,
    editable: true,
  },
];

const SingleFee = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data: feesRecords, error, isLoading,refetch } = useGetAllFeesRecordsOfAStudentQuery(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const findFeeHistory = FeesHistory.filter((user) => user.studentId === numericId);
    setData(findFeeHistory);
  }, [id]);

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  return (
    <div className='SingleFee'>
      <div className="info">
        <h1>Student Fees History</h1>
        <button onClick={() => setOpen(true)}>Add New Fees</button>
      </div>
      <SingleData
        slug="Fee"
        columns={columns}
        rows={feesRecords}
        onEditRow={handleEditRow}
        refetch={refetch}
      />
      {open && <AddHistory slug="Fee" columns={columns} setOpen={setOpen} refetch={refetch} id={id} />}
      {openEdit && <EditFee slug="Fee" columns={columns} setOpenEdit={setOpenEdit} selectedRow={selectedRow} refetch={refetch} />}
    </div>
  );
};

export default SingleFee;

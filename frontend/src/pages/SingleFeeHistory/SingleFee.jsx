import React, { useEffect, useState } from 'react';
import SingleData from '../../components/SingleData/SingleData';
import AddHistory from '../../components/AddSingleUserHistory/AddHistory';
import { useParams } from 'react-router-dom';
import { FeesHistory } from '../../data';
import './Single.scss';
import EditFee from '../../components/EditFees/EditFee';

const columns = [
  { field: 'studentId', headerName: 'ID', width: 90 },
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
      return new Date(params.value);
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 165,
    editable: true,
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
  {
    field: 'remarks',
    headerName: 'Remark',
    width: 160,
    editable: true,
  },
];

const SingleFee = () => {
  const { id } = useParams();
  const [open, SetOpen] = useState(false);
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, SetData] = useState([]);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const findFeeHistory = FeesHistory.filter((user) => user.studentId === numericId);
    SetData(findFeeHistory);
  }, [id]);

  const handleEditRow = (row) => {
    setSelectedRow(row);
    SetOpenEdit(true);
  };

  return (
    <div className='SingleFee'>
      <div className="info">
        <h1>Student Fees History</h1>
        <button onClick={() => SetOpen(true)}>Add New Fees</button>
      </div>
      <SingleData
        slug="StudentLibrary"
        columns={columns}
        rows={data}
        onEditRow={handleEditRow} // Assuming your SingleData component handles editing
      />  
      {open && <AddHistory slug="Fee" columns={columns} SetOpen={SetOpen} />}
      {openEdit && <EditFee slug="Fee" columns={columns} SetOpenEdit={SetOpenEdit} selectedRow={selectedRow} />}

    </div>
  );
};

export default SingleFee;

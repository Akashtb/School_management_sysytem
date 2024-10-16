import DataTable from '../../components/dataTable/dataTable';
import RecordList from '../../components/RecordList/RecordList';
import { studentDetails } from '../../data';
import './FeeHistory.scss';
import { useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'Avatar',
        headerName: 'Avatar',
        width: 80,
        renderCell: (params) => {
            return <img src={params?.row?.img || ''} alt="avatar" />;
        }
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 120,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 120,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 50,
        editable: true,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 100,
        editable: true,
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date of Birth',
        width: 120,
        type: 'date',
        editable: false,
        valueFormatter: (params) => {
            const date = new Date(params);
            return !isNaN(date.getTime()) ? date.toLocaleDateString() : '';
        },
    },
    {
        field: 'class',
        headerName: 'Class',
        width: 100,
        editable: true,
    },
    {
        field: 'enrollmentDate',
        headerName: 'Enrollment Date',
        width: 130,
        type: 'date',
        editable: false,
        valueFormatter: (params) => {
            const date = new Date(params);
            return !isNaN(date.getTime()) ? date.toLocaleDateString() : '';
        },
    }, 
];

const FeeHistory = () => {
  return (
    <div className='FeeHistory'>
          <div className="info">
                <h1>Students</h1>
            </div>
            <RecordList slug="students" columns={columns} rows={studentDetails} />
    </div>
  )
}

export default FeeHistory


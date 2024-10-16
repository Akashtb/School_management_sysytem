import { useEffect, useState } from 'react';
import './student.scss';
import DataTable from '../../components/dataTable/dataTable';
import Add from '../../components/Add/Add';
import { studentDetails } from '../../data';
import axios from 'axios';
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
    {
        field: 'guardianContact',
        headerName: 'Guardian Contact',
        width: 180,
        editable: true,
        valueGetter: (params) => {params?.guardianDetails?.contactNumber || 'N/A'}
    },
];


const Student = () => {
    const [open, SetOpen] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        fetchStudentData();
    }, []);

    return (
        <div className='Student'>
            <div className="info">
                <h1>Students</h1>
                <button onClick={() => SetOpen(true)}>Add New Student</button>
            </div>
            <DataTable slug="students" columns={columns} rows={studentDetails} />
            {open && <Add slug="students" columns={columns} SetOpen={SetOpen} />}
        </div>
    ) 
}

export default Student
import { useEffect, useState } from 'react';
import './student.scss';
import DataTable from '../../components/dataTable/dataTable';
import Add from '../../components/Add/Add';
import { studentDetails } from '../../data';
import { useGetUsersQuery } from '../../features/users/userApiSlice';
import StudentEdit from '../../components/StudentEdit/StudentEdit';
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
        type:'text',
        width: 120,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        type:'text',
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
        renderEditCell: (params) => (
          <select
            defaultValue={params.value} 
            style={{ width: '100%', height: '100%' }} 
            onChange={(e) => {
              params.api.updateRowData({
                update: [{ ...params.row, gender: e.target.value }],
              });
            }}
          >
            <option value="">Select</option> // Placeholder option
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ),
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
        renderEditCell: (params) => (
          <select
            defaultValue={params.value} 
            style={{ width: '100%', height: '100%' }} 
            onChange={(e) => {
              params.api.updateRowData({
                update: [{ ...params.row, class: e.target.value }],
              });
            }}
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        ),
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
        field: 'guardianName',
        headerName: 'Guardian Name',
        type:'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianContact',
        headerName: 'Guardian Contact',
        type:'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianRelationship',
        headerName: 'Guardian Relationship',
        type:'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianEmail',
        headerName: 'Guardian Email',
        type:'text',
        width: 180,
        editable: true,
    },

];


const Student = () => {
  const [open, SetOpen] = useState(false);  
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // To store the selected row data
  const { data: users, error, isLoading } = useGetUsersQuery();
  console.log(users);

  const handleOpenEdit = (isOpen, rowData = null) => {
      SetOpenEdit(isOpen);
      setSelectedRow(rowData);
  };

  return (
      <div className='Student'>
          <div className="info">
              <h1>Students</h1>
              <button onClick={() => SetOpen(true)}>Add New Student</button>
          </div>
          <DataTable slug="students" columns={columns} rows={studentDetails} SetOpenEdit={handleOpenEdit} />
          {open && <Add slug="students" columns={columns} SetOpen={SetOpen} />}
          {openEdit && <StudentEdit slug="students" columns={columns} SetOpenEdit={handleOpenEdit} rowData={selectedRow} />} {/* Pass the selected rowData */}
      </div>
  ) 
}

export default Student;
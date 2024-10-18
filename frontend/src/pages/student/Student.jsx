import { useEffect, useState } from 'react';
import './student.scss';
import DataTable from '../../components/dataTable/dataTable';
import Add from '../../components/Add/Add';
import { useGetAllStudentsQuery } from '../../features/users/studentApiSlice';
import { noAvatar } from '../../assets/image';
import Edit from '../../components/StudentEdit/StudentEdit';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../features/auth/AuthSLice';

const columns = [
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 80,
        renderCell: (params) => {
            return <img src={params?.row?.avatar || noAvatar}  />;
        }
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        type: 'text',
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
            <option value="">Select</option> 
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
          console.log(params);
          
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
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={`${i + 1} Class`}>{i + 1}</option>
            ))}
          </select>
        ),
    },
    {
        field: 'enrollmentDate',
        headerName: 'Enrollment Date',
        width: 130,
        editable: false,
       
    }, 
    {
        field: 'guardianName',
        headerName: 'Guardian Name',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianContactNumber',
        headerName: 'Guardian Contact',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianRelationship',
        headerName: 'Guardian Relationship',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'guardianEmail',
        headerName: 'Guardian Email',
        type: 'text',
        width: 180,
        editable: true,
    },
];

const Student = () => {
  const [open, SetOpen] = useState(false);  
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data: students, isLoading, isError ,refetch} = useGetAllStudentsQuery(); 
  const role = useSelector(selectCurrentRole);


  console.log(students);
  
  useEffect(()=>{
    refetch()
  },[])

  const handleOpenEdit = (isOpen, rowData = null) => {
      SetOpenEdit(isOpen);
      setSelectedRow(rowData);
  };

  return (
      <div className='Student'>
          <div className="info">
              <h1>Students</h1>
              {role === 'Admin' && (
              <button onClick={() => SetOpen(true)}>Add New Student</button>
            )}
          </div>
          <DataTable slug="students" columns={columns} rows={students} SetOpenEdit={handleOpenEdit} refetch={refetch} />
          {open && <Add slug="students" columns={columns} SetOpen={SetOpen} refetch={refetch}/>}
          {openEdit && <Edit slug="students" columns={columns} SetOpenEdit={handleOpenEdit} rowData={selectedRow} refetch={refetch} />}
      </div>
  ); 
}

export default Student;

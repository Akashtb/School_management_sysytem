import { useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/dataTable';
import { userRows } from '../../data';
import './user.scss';
import Add from '../../components/Add/Add';
import Edit from '../../components/StudentEdit/StudentEdit';
import UserEdit from '../../components/UserEdit/UserEdit';
import { useGetAllUsersExceptCurrentUserQuery } from '../../features/users/userApiSlice';
import { noAvatar } from '../../assets/image';
const columns = [
  {
    field: 'avatar', headerName: 'Avatar', width: 80,
    renderCell: (params) => {
      return <img src={params.row.avatar || noAvatar} alt="" />
    }
  },
  {
    field: 'firstName',
    headerName: 'First name',
    type: 'text',
    width: 165,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    type: 'text',
    width: 165,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    editable: true,
  },
  {
    field: 'qualification',
    headerName: 'Qualification',
    type: 'text',
    width: 120,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    type: 'email',
    width: 200,
    editable: true,
  },
  {
    field: 'password',
    headerName: 'password',
    type: 'password',
    width: 150,
    editable: true,
  },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },

  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    editable: true,
    renderEditCell: (params) => (
      <select
        defaultValue={params.value} 
        style={{ width: '100%', height: '100%' }} 
        onChange={(e) => {
          params.api.updateRowData({
            update: [{ ...params.row, role: e.target.value }],
          });
        }}
      >
        <option value="" disabled>Select</option> 
        <option value="Admin">Admin</option>
        <option value="Office Staff">Office Staff</option>
        <option value="Librarian">Librarian</option>
      </select>
    ),
  },
  

  

];

const User = () => {
  const [open, SetOpen] = useState(false);  
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); 
  const { data: users, isLoading, isError ,refetch} = useGetAllUsersExceptCurrentUserQuery();

  useEffect(() => {
    refetch();
}, []);

  console.log(users);
  


  const handleOpenEdit = (isOpen, rowData = null) => {
    SetOpenEdit(isOpen);
    setSelectedRow(rowData); 
};
  return (
    <div className='user'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>SetOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={users} SetOpenEdit={handleOpenEdit} refetch={refetch}/>
      {open && <Add slug="user" columns={columns} SetOpen={SetOpen} refetch={refetch}/>}
      {openEdit && <UserEdit slug="users" columns={columns} SetOpenEdit={handleOpenEdit} rowData={selectedRow} refetch={refetch}/>} {/* Pass the selected rowData */}
    </div>
  )
}

export default User

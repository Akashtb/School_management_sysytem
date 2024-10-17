import { useState } from 'react';
import DataTable from '../../components/dataTable/dataTable';
import { userRows } from '../../data';
import './user.scss';
import Add from '../../components/Add/Add';
import Edit from '../../components/StudentEdit/StudentEdit';
import UserEdit from '../../components/UserEdit/UserEdit';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Avatar', headerName: 'Avatar', width: 80,
    renderCell: (params) => {
      return <img src={params.row.img || noAvatar} alt="" />
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
    type: 'password',
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
    type: 'text',
    width: 100,
    editable: true,
  },

  

];

const User = () => {
  const [open, SetOpen] = useState(false);  
  const [openEdit, SetOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); 

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
      <DataTable slug="users" columns={columns} rows={userRows} SetOpenEdit={handleOpenEdit}/>
      {open && <Add slug="user" columns={columns} SetOpen={SetOpen}/>}
      {openEdit && <UserEdit slug="users" columns={columns} SetOpenEdit={handleOpenEdit} rowData={selectedRow} />} {/* Pass the selected rowData */}
    </div>
  )
}

export default User

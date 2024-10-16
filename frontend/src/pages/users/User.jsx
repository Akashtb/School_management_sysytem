import { useState } from 'react';
import DataTable from '../../components/dataTable/dataTable';
import { userRows } from '../../data';
import './user.scss';
import Add from '../../components/Add/Add';
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
    width: 165,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 165,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    type: 'email',
    width: 260,
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
    field: "Status", headerName: "Status", width: 100, type: "boolean"
  },

];

const User = () => {
  const [open,SetOpen]=useState(false)
  return (
    <div className='user'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>SetOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {open && <Add slug="user" columns={columns} SetOpen={SetOpen}/>}
    </div>
  )
}

export default User

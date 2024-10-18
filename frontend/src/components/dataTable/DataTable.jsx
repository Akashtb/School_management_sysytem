import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import './datatable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useDeleteUserMutation } from '../../features/users/userApiSlice';
import { toast } from 'react-toastify';
import { useDeleteStudentMutation } from '../../features/users/studentApiSlice';
import { selectCurrentRole } from '../../features/auth/AuthSLice';
import { useSelector } from 'react-redux';

const DataTable = (props) => {
    const [deleteUser] = useDeleteUserMutation();
    const [deleteStudent] = useDeleteStudentMutation();
    const role = useSelector(selectCurrentRole);


    const handleDelete = async (id) => {
        try {
            if(props.slug==="users"){
                await deleteUser(id).unwrap();
                props.refetch()
                toast.success("User deleted successfully")
            }
            if(props.slug==="students"){
                await deleteStudent(id).unwrap();
                props.refetch()
                toast.success("Student deleted successfully")

            }
           
        } catch (error) {
            console.error("Failed to delete the user: ", error);
            toast.success("Something went wrong check the connection")
        }
    };
    const handleEditClick = (rowData) => {
        props.SetOpenEdit(true, rowData); 
    };

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
                <div className="action" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className='view'>
                        <Link to={`/${props.slug}/view/${params.row._id}`}>
                            <AiOutlineEye size={20} style={{ cursor: 'pointer', color: '#007BFF' }} />
                        </Link>
                    </div>
                    {role === 'Admin' && (
                        <>
                            <div className='edit'>
                                <AiOutlineEdit
                                    size={20}
                                    style={{ cursor: 'pointer', color: '#28A745' }}
                                    onClick={() => handleEditClick(params.row)}
                                />
                            </div>
                            <div className='delete' onClick={() => handleDelete(params.row._id)}>
                                <AiOutlineDelete size={20} style={{ cursor: 'pointer', color: '#DC3545' }} />
                            </div>
                        </>
                    )}
                </div>
            );
        }
    };

    const filteredColumns = props.columns.filter(column => column.field !== 'password' && column.field !== 'guardianRelationship' && column.field !== 'guardianEmail');

    return (
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...filteredColumns, actionColumn]}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{
                    toolbar: GridToolbar
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
}

export default DataTable;

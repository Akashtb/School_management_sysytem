import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import './datatable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

const DataTable = (props) => {

    const handleDelete = (id) => {
        console.log("ID has been deleted:", id);
    }

    const handleEditClick = (rowData) => {
        props.SetOpenEdit(true, rowData); // Pass the row data to the parent component
    };

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => {
            return (
                <div className="action" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className='view'>
                        <Link to={`/${props.slug}/view/${params.row.id}`}>
                            <AiOutlineEye size={20} style={{ cursor: 'pointer', color: '#007BFF' }} />
                        </Link>
                    </div>
                    <div className='edit'>
                        <AiOutlineEdit 
                            size={20} 
                            style={{ cursor: 'pointer', color: '#28A745' }} 
                            onClick={() => handleEditClick(params.row)} // Pass the row data when clicked
                        />
                    </div>
                    <div className='delete' onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete size={20} style={{ cursor: 'pointer', color: '#DC3545' }} />
                    </div>
                </div> 
            );
        }
    }

    const filteredColumns = props.columns.filter(column => column.field !== 'password' && column.field !== 'guardianRelationship' && column.field !== 'guardianEmail');

    return (
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...filteredColumns, actionColumn]}
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
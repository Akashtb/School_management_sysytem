import React from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

const SingleData = () => {


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
                        <Link to={`/${props.slug}/edit/${params.row.id}`}>
                            <AiOutlineEdit size={20} style={{ cursor: 'pointer', color: '#28A745' }} />
                        </Link>
                    </div>
                    <div className='delete' onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete size={20} style={{ cursor: 'pointer', color: '#DC3545' }} />
                    </div>
                </div> 
            );
        }
    }
  return (
    <div className='SingleData'>
         <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
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
  )
}

export default SingleData
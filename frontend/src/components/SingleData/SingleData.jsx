import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

const SingleData = (props) => {
    const actionColumn = {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="action" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className='edit'>
              <span onClick={() => props.onEditRow(params.row)} style={{ cursor: 'pointer', color: '#28A745' }}>
                <AiOutlineEdit size={20} />
              </span>
            </div>
            <div className='delete' onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete size={20} style={{ cursor: 'pointer', color: '#DC3545' }} />
            </div>
          </div>
        );
      },
    };
  
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
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
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
  };
  
  export default SingleData;
  

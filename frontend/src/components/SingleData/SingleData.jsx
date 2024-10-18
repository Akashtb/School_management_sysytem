import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDeleteLibraryRecordOfAStudentMutation } from '../../features/users/librarySliceApi';
import { toast } from 'react-toastify';
import { useDeleteFeesRecordOfAStudentMutation } from '../../features/users/feeSliceApi';

const SingleData = (props) => {
  const [deleteRecord, { isLoading }] = useDeleteLibraryRecordOfAStudentMutation();
  const [deleteFeesRecord, { isLoading: isDeleting }] = useDeleteFeesRecordOfAStudentMutation();

  const handleDelete = async (id) => {
    try {
      if (props.slug === "Library") {
        await deleteRecord(id).unwrap();
        props.refetch()
        toast.success("SuccessFully deleted the record")
      }

      if(props.slug==="Fee"){
        await deleteFeesRecord(id).unwrap();
        props.refetch()
        toast.success("SuccessFully deleted the record")
      }
    } catch (err) {
      console.error('Failed to delete the record: ', err);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => (
      <div className="action" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span onClick={() => props.onEditRow(params.row)} style={{ cursor: 'pointer', color: '#28A745' }}>
          <AiOutlineEdit size={20} />
        </span>
        <span onClick={() => handleDelete(params.row._id)} style={{ cursor: 'pointer', color: '#DC3545' }}>
          <AiOutlineDelete size={20} />
        </span>
      </div>
    ),
  };

  return (
    <div className='SingleData'>
      <DataGrid
        className='dataGrid'
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
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

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './Record.scss';
import { useNavigate } from 'react-router-dom';

const RecordList = (props) => {
    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate(`/${props.nav}/${params.row.id}`);
    };
  return (
    <div className='RecordList'>
        <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={props.columns}
                onRowClick={handleRowClick}
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

export default RecordList 
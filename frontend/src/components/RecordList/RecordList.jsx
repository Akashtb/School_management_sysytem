import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './Record.scss';
const RecordList = (props) => {
  return (
    <div className='RecordList'>
        <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={props.columns}
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
import React from 'react'

const SingleFee = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
       
        {
          field: 'feeType',
          headerName: 'Fee Type',
          width: 165,
          editable: true,
        },
        {
          field: 'paymentDate',
          headerName: 'Payment Date',
          type: 'email',
          width: 260,
          editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 165,
            editable: true,
          },
        {
          field: "status", headerName: "Status", width: 100, type: "boolean"
        },
        {
            field: 'remarks',
            headerName: 'Remark',
            width: 160,
            editable: true,
          },
      
      ];
  return (
    <div>

    </div>
  )
}

export default SingleFee
import './Add.scss';
const Add = (props) => {
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  return (
    <div className='add'>
      <div className="modal">
        <span className="close" onClick={()=>props.SetOpen(false)}>X</span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "Avatar")
            .map((column) => (
              <div className="items">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
            <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Add
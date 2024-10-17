import { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import './UserEdit.scss';

const UserEdit = (props) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({}); 

   
    useEffect(() => {
        if (props.rowData) { 
            setFormData(props.rowData); 
        }
    }, [props.rowData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        props.SetOpenEdit(false); 
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const filteredColumns = props?.columns?.filter(column => column.field !== 'id');

    return (
        <div className='UserEdit'>
            <div className="modal">
                <span className="close" onClick={() => props.SetOpenEdit(false)}>X</span> 
                <h1>Edit {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="avatar-container">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="avatar-input"
                        />
                        <div
                            className="avatar-preview"
                            onClick={() => document.getElementById('avatar-input').click()}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="avatar-preview"
                                    className="avatar-image"
                                />
                            ) : (
                                <FaCamera className="camera-icon" />
                            )}
                        </div>
                    </div>

                    <div className="OtherInputs">
                        {filteredColumns?.map((column) => {
                            if (column.field === 'gender') {
                                return (
                                    <div className="input-item" key={column.field}>
                                        <select
                                            name="gender"
                                            value={formData.gender || ''} 
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                );
                            }

                            if (column.field === 'class') {
                                return (
                                    <div className="input-item" key={column.field}>
                                        <select
                                            name="class"
                                            value={formData.class || ''} 
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Select Class</option>
                                            {[...Array(12)?.keys()]?.map((num) => (
                                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            }

                            return (
                                column.field !== "Avatar" && (
                                    <div className="input-item" key={column.field}>
                                        <input
                                            type={column.type || 'text'} 
                                            name={column.field}
                                            placeholder={column.headerName || column.field}
                                            value={formData[column.field] || ''} 
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>

                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;

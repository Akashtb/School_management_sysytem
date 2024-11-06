import { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import './Edit.scss';
import { toast } from 'react-toastify';
import { useUpdateStudentDetailMutation } from '../../features/users/studentApiSlice';

const Edit = (props) => {
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateStudentDetail] = useUpdateStudentDetailMutation(); 

    useEffect(() => {
        if (props.rowData) {
            const { dateOfBirth, ...rest } = props.rowData;
            const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '';
            setFormData({ ...rest, dateOfBirth: formattedDateOfBirth });
            if (props.rowData.avatar) {
                setPreview(props.rowData.avatar);
            }
        }
    }, [props.rowData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudentDetail({ id: props.rowData._id, studentData: formData }).unwrap(); 
            toast.success("Successfully updated student details");
            props.refetch();
            props.SetOpenEdit(false); 
        } catch (error) {
            console.error('Failed to update student: ', error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('upload_preset', 'upload');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload', uploadData);
                const imageUrl = response.data.secure_url;

                setFormData((prevData) => ({ ...prevData, avatar: imageUrl }));
                setPreview(imageUrl);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const filteredColumns = props?.columns?.filter(column => column.field !== 'id');

    return (
        <div className='Edit'>
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
                                            required
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
                                            required
                                        >
                                            <option value="" disabled>Select Class</option>
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={`${i + 1} Class`}>{i + 1}</option>
                                            ))} 
                                        </select>
                                    </div>
                                );
                            }

                            if (column.field === 'dateOfBirth') {
                                return (
                                    <div className="input-item" key={column.field}>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth || ''}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                );
                            }

                            return (
                                column.field !== "avatar" && column.field !== "enrollmentDate" && (
                                    <div className="input-item" key={column.field}>
                                        <input
                                            type={column.type || 'text'}
                                            name={column.field}
                                            placeholder={column.headerName || column.field}
                                            value={formData[column.field] || ''}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;

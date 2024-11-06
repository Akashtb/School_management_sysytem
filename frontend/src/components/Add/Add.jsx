import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import './Add.scss';
import { useCreateUserMutation } from '../../features/users/userApiSlice';
import { toast } from 'react-toastify';
import { useCreateStudentMutation } from '../../features/users/studentApiSlice';
import axios from 'axios';

const Add = (props) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({});
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  const [createStudent] = useCreateStudentMutation();


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
      if (props.slug === "user") {
        console.log(formData, "formData");

        await createUser(formData).unwrap();
        toast.success("New user created successfully");
        props.refetch();
        props.SetOpen(false);
      }
      if (props.slug === "students") {
        await createStudent(formData).unwrap();
        toast.success("New student created successfully");
        props.refetch();
        props.SetOpen(false);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error("Something went wrong, check the connection");
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
        console.log(imageUrl);


        setImage(file);
        setPreview(imageUrl);
        setFormData((prevData) => ({ ...prevData, avatar: imageUrl }));
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        toast.error("Failed to upload image, please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const filteredColumns = props.columns.filter(column => column.field !== 'enrollmentDate' && column.field !== 'id' && column.field !== 'fullName' && column.field !== 'avatar');

  return (
    <div className='add'>
      <div className="modal">
        <span className="close" onClick={() => props.SetOpen(false)}>X</span>
        <h1>Add new {props.slug}</h1>
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
            {filteredColumns.map((column) => {
              if (column.field === 'gender') {
                return (
                  <div className="input-item" key={column.field}>
                    <select name="gender" onChange={handleInputChange} defaultValue="" required>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                );
              }

              if (column.field === 'role') {
                return (
                  <div className="input-item" key={column.field}>
                    <select name="role" onChange={handleInputChange} defaultValue="" required>
                      <option value="" disabled>Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Office Staff">Office Staff</option>
                      <option value="Librarian">Librarian</option>
                    </select>
                  </div>
                );
              }

              if (column.field === 'class') {
                return (
                  <div className="input-item" key={column.field}>
                    <select name="class" onChange={handleInputChange} defaultValue="" required>
                      <option value="" disabled>Select Class</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={`${i + 1} Class`}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                column.field !== "Avatar" && (
                  <div className="input-item" key={column.field}>
                    <input
                      type={column.type}
                      name={column.field}
                      placeholder={column.field}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )
              );
            })}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

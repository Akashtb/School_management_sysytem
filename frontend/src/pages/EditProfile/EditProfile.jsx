import React, { useEffect, useState } from 'react';
import './EditProfile.scss';
import { AiOutlineCamera } from 'react-icons/ai';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../../features/users/userApiSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {
    const { data: currentUser, isLoading, error, refetch } = useGetCurrentUserQuery();
    const [updateCurrentUser] = useUpdateCurrentUserMutation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        qualification: '',
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                age: currentUser.age || '',
                qualification: currentUser.qualification || '',
            });
            if (currentUser.avatar) {
                setImage(currentUser.avatar);
            }
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadData = new FormData(); // Correctly define uploadData here
            uploadData.append('file', file);
            uploadData.append('upload_preset', 'upload');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload', uploadData);
                console.log(response);
                
                const imageUrl = response.data.secure_url;
                setImage(imageUrl);
                toast.success('Image uploaded successfully');
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                toast.error('Failed to upload image. Please try again.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await updateCurrentUser({ ...formData, avatar: image }).unwrap();
            refetch();
            toast.success('Successfully updated');
        } catch (err) {
            console.error('Failed to update profile:', err);
            toast.error('Something went wrong. Check your connection.');
        }
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <div className="image-upload">
                <label htmlFor="image-input" className="image-label">
                    {image ? (
                        <img src={image} alt="Profile" className="profile-image" />
                    ) : (
                        <AiOutlineCamera className="camera-icon" />
                    )}
                </label>
                <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="qualification">Qualification</label>
                    <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;

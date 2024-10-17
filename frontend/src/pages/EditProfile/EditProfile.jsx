import React, { useState } from 'react';
import './EditProfile.scss';
import { AiOutlineCamera } from 'react-icons/ai';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        bio: '',
        age: '',
        qualification: '',
        password: '',
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({}); // State for validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Minimum length for password
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; // Example: Validate for 10-digit phone numbers
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        if (!validatePhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits long.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop submission if there are errors
        }

        console.log('Profile updated:', formData, image);
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
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit" className="submit-button">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;

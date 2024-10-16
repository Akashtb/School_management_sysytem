import React from 'react';
import './userView.scss';

const UserView = () => {
  return (
    <div className="userview">
      <div className="propicture">
        <img
          src="/path/to/profile-picture.jpg"
          alt="Profile"
          className="proimage"
        />
      </div>

      <div className="userDetails">
        <div className="detail">
          <label>First Name</label>
          <input type="text" value="John" readOnly />
        </div>

        <div className="detail">
          <label>Last Name</label>
          <input type="text" value="Doe" readOnly />
        </div>

        <div className="detail">
          <label>Email</label>
          <input type="email" value="john.doe@example.com" readOnly />
        </div>

        <div className="detail">
          <label>Age</label>
          <input type="number" value="28" readOnly />
        </div>

        <div className="detail">
          <label>Qualification</label>
          <input type="text" value="Bachelor's Degree" readOnly />
        </div>

        <div className="detail">
          <label>Role</label>
          <input type="text" value="Developer" readOnly />
        </div>
      </div>
    </div>
  );
};

export default UserView;

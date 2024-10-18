import React from 'react';
import './userView.scss';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../features/users/userApiSlice';
import { noAvatar } from '../../assets/image';

const UserView = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data</p>;

  return (
    <div className="userview">
      <div className="propicture">
        <img
          src={user?.avatar || noAvatar}
          alt="Profile"
          className="proimage"
        />
      </div>

      <div className="userDetails">
        <div className="detail">
          <label>First Name</label>
          <input type="text" value={user?.firstName || ''} readOnly />
        </div>

        <div className="detail">
          <label>Last Name</label>
          <input type="text" value={user?.lastName || ''} readOnly />
        </div>

        <div className="detail">
          <label>Email</label>
          <input type="email" value={user?.email || ''} readOnly />
        </div>

        <div className="detail">
          <label>Age</label>
          <input type="number" value={user?.age || ''} readOnly />
        </div>

        <div className="detail">
          <label>Qualification</label>
          <input type="text" value={user?.qualification || ''} readOnly />
        </div>

        <div className="detail">
          <label>Role</label>
          <input type="text" value={user?.role || ''} readOnly />
        </div>
      </div>
    </div>
  );
};

export default UserView;

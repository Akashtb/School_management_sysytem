import { useParams } from 'react-router-dom';
import './studentView.scss';
import { useGetStudentByIdQuery } from '../../features/users/studentApiSlice';
import { noAvatar } from '../../assets/image';

const StudentView = () => {
  const {id}=useParams()
  console.log(id);
  
  const { data: student, isLoading, isError } = useGetStudentByIdQuery(id);

  return (
    <div className='studentView'>
    <div className='propicture'>
      <img
        src={student?.avatar || noAvatar}
        alt='Profile'
        className='proimage'
      />
    </div>

    <div className='userDetails'>
      <div className='detail'>
        <label>First Name</label>
        <input type='text' value={student?.firstName || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Last Name</label>
        <input type='text' value={student?.lastName || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Age</label>
        <input type='number' value={student?.age || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Gender</label>
        <input type='text' value={student?.gender || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Date of Birth</label>
        <input type='date' value={student?.dateOfBirth?.split('T')[0] || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Address</label>
        <input type='text' value={student?.address || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Class</label>
        <input type='text' value={student?.class || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Enrollment Date</label>
        <input type='date' value={student?.enrollmentDate?.split('T')[0] || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Guardian Name</label>
        <input type='text' value={student?.guardianName || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Guardian Relationship</label>
        <input type='text' value={student?.guardianRelationship || ''} readOnly />
      </div>

      <div className='detail'>
        <label>Guardian Contact Number</label>
        <input type='text' value={student?.guardianContactNumber || ''} readOnly />
      </div>
    </div>
  </div>
  );
};

export default StudentView;

import './studentView.scss';

const StudentView = () => {
  return (
    <div className='studentView'>
      <div className='propicture'>
        <img
          src='/path/to/profile-picture.jpg'
          alt='Profile'
          className='proimage'
        />
      </div>

      <div className='userDetails'>
        <div className='detail'>
          <label>First Name</label>
          <input type='text' value='Jane' readOnly />
        </div>

        <div className='detail'>
          <label>Last Name</label>
          <input type='text' value='Doe' readOnly />
        </div>

        <div className='detail'>
          <label>Age</label>
          <input type='number' value='16' readOnly />
        </div>

        <div className='detail'>
          <label>Gender</label>
          <input type='text' value='Female' readOnly />
        </div>

        <div className='detail'>
          <label>Date of Birth</label>
          <input type='date' value='2008-05-15' readOnly />
        </div>

        <div className='detail'>
          <label>Address</label>
          <input type='text' value='1234 Main St, City, Country' readOnly />
        </div>

        <div className='detail'>
          <label>Class</label>
          <input type='text' value='10th Grade' readOnly />
        </div>

        <div className='detail'>
          <label>Enrollment Date</label>
          <input type='date' value='2020-08-01' readOnly />
        </div>

        <div className='detail'>
          <label>Guardian Name</label>
          <input type='text' value='John Doe' readOnly />
        </div>

        <div className='detail'>
          <label>Guardian Relationship</label>
          <input type='text' value='Father' readOnly />
        </div>

        <div className='detail'>
          <label>Guardian Contact Number</label>
          <input type='text' value='+1234567890' readOnly />
        </div>
      </div>
    </div>
  );
};

export default StudentView;

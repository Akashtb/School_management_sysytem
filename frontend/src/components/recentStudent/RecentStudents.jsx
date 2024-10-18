import { noAvatar } from '../../assets/image';
import { topDealUsers } from '../../data';
import './recentstudent.scss';
topDealUsers
const RecentStudents = ({students}) => {
    console.log(students);
    
    return (
        <div className='recentStudent'>
            <h1>Recent Students</h1>
            <div className="list">
                {students?.map(user => (
                    <div className="listItems" key={user._id}>
                        <div className="user">
                            <img src={user?.avatar || noAvatar}/>
                            <div className='userDetails'>
                                <span className="username">{`${user?.firstName} ${user?.lastName}`}</span>
                                <span className="email">{user?.email}</span>
                            </div>
                        </div>
                        <span className="class">{user?.class}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentStudents
import { topDealUsers } from '../../data';
import './recentstudent.scss';
topDealUsers
const RecentStudents = () => {
    return (
        <div className='recentStudent'>
            <h1>RecentStudents</h1>
            <div className="list">
                {topDealUsers.map(user => (
                    <div className="listItems" key={user.id}>
                        <div className="user">
                            <img src={user.img} alt="" />
                            <div className='userDetails'>
                                <span className="username">{user.username}</span>
                                <span className="email">{user.email}</span>
                            </div>
                        </div>
                        <span className="class">{user.class}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentStudents
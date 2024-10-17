import { topDealUsers } from '../../data';
import './RecentUser.scss';
const RecentUser = () => {
  return (
    <div className='RecentUser'>
             <h1>Recent Users</h1>
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

export default RecentUser
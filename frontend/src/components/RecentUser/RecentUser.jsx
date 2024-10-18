import { noAvatar } from '../../assets/image';
import { topDealUsers } from '../../data';
import './RecentUser.scss';
const RecentUser = ({recentUsers}) => {
  return (
    <div className='RecentUser'>
             <h1>Recent Users</h1>
            <div className="list">
                {recentUsers?.map(user => (
                    <div className="listItems" key={user?._id}>
                        <div className="user">
                            <img src={user?.avatar || noAvatar} alt="" />
                            <div className='userDetails'>
                                <span className="username">{`${user?.firstName} ${user?.lastName}`}</span>
                                <span className="email">{user?.email}</span>
                            </div>
                        </div>
                        <span className="class">{user?.role}</span>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default RecentUser
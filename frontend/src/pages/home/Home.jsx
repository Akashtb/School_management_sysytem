import ChartBox from '../../components/chartBox/ChartBox'
import RecentStudents from '../../components/recentStudent/RecentStudents'
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from '../../data'
import './home.scss'
import { product, revenueIcon, user } from '../../assets/image.js'
import BarChartBox from '../../components/barChartBox/BarChartBox.jsx'
import PicChartBox from '../../components/piChartBox/PicChartBox.jsx'
import BigChart from '../../components/bigChart/BigChart.jsx'
import RecentUser from '../../components/RecentUser/RecentUser.jsx'
import { useGetRecentStudentsQuery } from '../../features/users/studentApiSlice.jsx'
import { useGetRecentUsersQuery } from '../../features/users/userApiSlice.jsx'
const Home = () => {
  const { data: students } = useGetRecentStudentsQuery();
  const { data: recentUsers} = useGetRecentUsersQuery();

  return (
    <div className="home">
      <div className="box box1">
        <RecentStudents students={students}/>
      </div>
      <div className="box box2"><ChartBox {...chartBoxUser} icon={user} /></div>
      <div className="box box3"><ChartBox {...chartBoxConversion} icon={user} /></div>
      <div className="box box4"><RecentUser recentUsers={recentUsers}/></div>
      <div className="box box5"><ChartBox {...chartBoxProduct} icon={product}/></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue} icon={revenueIcon}/></div>
      <div className="box box7"><PicChartBox/></div>
      <div className="box box8"><ChartBox {...chartBoxUser} icon={user} /></div>
      <div className="box box9"><ChartBox {...chartBoxUser} icon={user} /></div>
      {/* <PicChartBox/> */}
    </div>
  )
}

export default Home
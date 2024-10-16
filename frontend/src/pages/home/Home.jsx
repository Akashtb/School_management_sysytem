import ChartBox from '../../components/chartBox/ChartBox'
import RecentStudents from '../../components/recentStudent/RecentStudents'
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from '../../data'
import './home.scss'
import { product, revenueIcon, user } from '../../assets/image.js'
import BarChartBox from '../../components/barChartBox/BarChartBox.jsx'
import PicChartBox from '../../components/piChartBox/PicChartBox.jsx'
import BigChart from '../../components/bigChart/BigChart.jsx'
const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <RecentStudents/>
      </div>
      <div className="box box2"><ChartBox {...chartBoxUser} icon={user} /></div>
      <div className="box box3"><ChartBox {...chartBoxConversion} icon={user} /></div>
      <div className="box box4"><PicChartBox/></div>
      <div className="box box5"><ChartBox {...chartBoxProduct} icon={product}/></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue} icon={revenueIcon}/></div>
      <div className="box box7"><BigChart/></div>
      <div className="box box8"><BarChartBox {...barChartBoxVisit}/></div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue}/></div>
    </div>
  )
}

export default Home
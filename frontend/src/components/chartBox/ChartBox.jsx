import { Link } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './chatbox.scss';

const ChartBox = ({ icon, title,number, color, percentage, chartData, dataKey }) => {    
    console.log(icon);
    
    return (
        <div className='chartBox'>
            <div className="boxInfo">
                <div className="title">
                    <img src={icon} alt="icon" />
                    <span>{title}</span>
                </div>
                <h1>{number}</h1>
                <Link to="/" style={{ color: color }}>View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={chartData}>
                            <Tooltip
                                contentStyle={{
                                    background: "transparent",
                                    border: "none",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 10, y: 70 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke="#7671d0"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span 
                        className="percentage" 
                        style={{ color: percentage < 0 ? "tomato" : "limegreen" }}>
                        {percentage}%
                    </span>
                    <span className='duration'>this month</span>
                </div>
            </div>
        </div>
    );
};

export default ChartBox;

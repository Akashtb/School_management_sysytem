import { Link } from "react-router-dom";
import './chatbox.scss';

const ChartBox = ({ icon, title,number, color}) => {    
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
          
        </div>
    );
};

export default ChartBox;

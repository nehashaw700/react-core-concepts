import { Link } from "react-router-dom";
import logo from "../images/logo.jpg"

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className= "logo" src="https://img.freepik.com/premium-vector/online-food-app-icon-food-shop-location-logo-also-online-resturent-location-template_608547-155.jpg" alt = "logo" />
            </div>

             <div className="navbar">
                <ul>
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/record"> Records </Link></li>
                    <li><Link to="/ToDo"> To-Do </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
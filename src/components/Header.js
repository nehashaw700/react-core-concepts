import logo from "../images/logo.jpg"

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className= "logo" src="https://img.freepik.com/premium-vector/online-food-app-icon-food-shop-location-logo-also-online-resturent-location-template_608547-155.jpg" alt = "logo" />
            </div>

             <div className="navbar">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;

import logo from "./assets/dicelogo.png";


export default function Navbar() {
    return (
     <nav className="nav">
        <a href="/" className="sitename">
       <img src={logo} alt="Dice Logo" width="120" height="50" style={{ objectFit: "contain" }}  className="logo" />
        </a>
        <ul>
            <li>
            <a href="https://www.linkedin.com/in/minglinchen/" className="contact-button">Creator 
            </a>
            </li>
            </ul>
            </nav>
    );
}
import "./ShopFooter.css";
import { Link } from "react-router-dom";


const ShopFooter = () => {
  const newYear = new Date().getFullYear();
  return (
    <div className="sub-container">
      <div className="useful-links">
        <h2 className="logo-text">UNIZONE 2024</h2>
        <ul className="useful-details">
          <li>Socials</li>
        </ul>
      </div>
      <div className="bottom-section">
        <div className="bottom-section-left">
          <ul>
            <li>
              <Link to={"/"}>Deals</Link>
            </li>
            <li>
              <a href="#products">What's New</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
          </ul>
        </div>
        <div className="bottom-sectino-right">UNIZONE {newYear}</div>
      </div>
    </div>
  );
};
export default ShopFooter;

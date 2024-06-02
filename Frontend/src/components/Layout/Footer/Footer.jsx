import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; Punit K P</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="http://instagram.com/punitp_2.703" target="_blank">Instagram </Link>
        <Link to="http://x.com/Punit2709" target="_blank">Twitter </Link>
      </div>
    </footer>
  );
};

export default Footer;
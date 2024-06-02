import React from 'react';
import {Link}  from 'react-router-dom'
import './Header.css';
import logo from '../../../images/logo.png';
import profileIcon from '../../../images/Profile.png';
import cartIcon from '../../../images/cart.png';
import searchIcon from '../../../images/search.png';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
                <div className="search-profile-cart">
                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-bar" />
                        <img src={searchIcon} alt="Search" className="search-icon" />
                    </div>
                    <Link to="#"><img src={profileIcon} alt="Profile" /></Link>
                    <Link to="#"><img src={cartIcon} alt="Cart" /></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
import React from 'react';
import {NavLink}  from 'react-router-dom'
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
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/products">Products</NavLink></li>
                    </ul>
                </nav>
                <div className="search-profile-cart">
                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-bar" />
                        <img src={searchIcon} alt="Search" className="search-icon" />
                    </div>
                    <NavLink to="#"><img src={profileIcon} alt="Profile" /></NavLink>
                    <NavLink to="#"><img src={cartIcon} alt="Cart" /></NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
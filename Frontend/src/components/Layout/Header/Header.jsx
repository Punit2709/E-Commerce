import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../../images/logo.png";
import profileIcon from "../../../images/Profile.png";
import cartIcon from "../../../images/cart.png";
import searchIcon from "../../../images/search.png";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </nav>
        <div className="search-profile-cart">
          <NavLink to="/search">
            <img src={searchIcon} alt="Search" />
          </NavLink>
          <NavLink to="/cart">
            <img src={cartIcon} alt="Cart" />
          </NavLink>
          {isAuthenticated ? (
            <div className="user-options-container">
              <UserOptions user={user} />
            </div>
          ) : (
            <NavLink to="/login">
              <img src={profileIcon} alt="Profile" />
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, Fragment } from "react";
import {useNavigate} from 'react-router-dom'
import MetaData from "../Layout/MetaData";
import "./Search.css";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- E-Commerce" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import WebFont from 'webfontloader'
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';


function App() {
  React.useEffect(() => {
    WebFont.load({
      google:{
        families:['Roboto', 'Droid sans', 'Chilanka']
      }
    })
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={ <Home/>}/>
        <Route exact path='/products/details/:id' element={ <ProductDetails/>}/>
        <Route exact path='/products' element={ <Products/>}/>
        <Route exact path='/products/:keyword' element={ <Products/>}/>
        <Route exact path='/search' element={ <Search/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

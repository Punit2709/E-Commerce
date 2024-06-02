import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import WebFont from 'webfontloader'
import Home from './components/Home/Home';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

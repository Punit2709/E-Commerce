import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import WebFont from 'webfontloader'

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
      <Footer />
    </Router>
  );
}

export default App;

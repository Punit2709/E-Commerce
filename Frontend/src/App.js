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
import LoginSignUp from './components/User/LoginSignUp';
import Profile from "./components/User/Profile"
import store from "./store"
import {loadUser} from "./actions/userAction"
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import { useSelector } from 'react-redux';



function App() {

  const {isAuthenticated, user} = useSelector(state => state.user);

  React.useEffect(() => {
    WebFont.load({
      google:{
        families:['Roboto', 'Droid sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser());
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
        <Route exact path='/login' element={ <LoginSignUp/>}/>
        <Route exact path='/account' element={ <Profile/>}/>
        <Route exact path='/me/update' element={ <UpdateProfile/>}/>
        <Route exact path='/password/update' element={ <UpdatePassword/>}/>
        <Route exact path='/password/forgot' element={ <ForgotPassword/>}/>
        <Route exact path='/password/reset/:token' element={ <ResetPassword/>}/>
        <Route exact path='/cart' element={ <Cart/>}/>
        <Route exact path='/shipping' element={ <Shipping/>}/>
        <Route exact path='/order/confirm' element={ <ConfirmOrder/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

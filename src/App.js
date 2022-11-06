import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import './App.css';
import ProductPage from './components/ProductPage';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile/index';
import Register from './pages/Register';
import HistoryCart from './pages/HistoryCart';
import Footer from './pages/Footer';
import FavoriteProducts from './pages/Profile/FavoriteProducts';
import MLB from './pages/MLB';
import NBA from './pages/NBA';
import NFL from "./pages/NFL";
import NHL from "./pages/NHL";
import MLS from './pages/MLS';
import College from "./pages/College";
import CerrarCompra from './pages/CerrarCompra';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import BuyAproved from './pages/BuyAproved';
import UserConfig from './pages/Profile/userConfig';

function App() {
  
  const initialUserData = {
    status: false,
    response: {
      nombreCompleto: "",
      telefono: "",
      email: "",
      idHistorialCompras: null,
    }
  };
  
  const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem("loggedTHF")) || initialUserData);

  const [cartLS, setCartLS] = useState(JSON.parse(window.localStorage.getItem("CartTHF")) || []);

  useEffect(() => {
    window.localStorage.setItem("loggedTHF", JSON.stringify(userData));
  }, [userData]);
  
  
  return (
    <div>
      <Header cartLS={cartLS} setCartLS={setCartLS} userData={userData}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route
        path="/login"
        element={<Login userData={userData} setUserData={setUserData}/>}/>

        <Route
        path="/logout"
        element={<Logout userData={userData} setUserData={setUserData} initialUserData={initialUserData}/>}/>
        
        <Route path="/profile" element={<Profile userData={userData} setUserData={setUserData} initialUserData={initialUserData}/>} />

        <Route path="/user-config" element={<UserConfig/>} />

        <Route path="/buy-aproved" element={<BuyAproved/>} />

        <Route path="/buy-history" element={<HistoryCart userData={userData}/>} />

        <Route path="/register" element={<Register userData={userData} setUserData={setUserData}/>}/>
        
        <Route path="/mlb" element={<MLB />}/>

        <Route path="/nba" element={<NBA/>}/>

        <Route path="/nfl" element={<NFL/>}/>

        <Route path="/nhl" element={<NHL/>}/>

        <Route path="/mls" element={<MLS/>}/>
        
        <Route path="/college" element={<College/>}/>

        <Route path="/cerrar-compra" element={<CerrarCompra cartLS={cartLS} />}/>

        <Route path="/cart" element={<CartPage setCartLS={setCartLS} cartLS={cartLS}/>}/>

        <Route path="/favorite-products" element={<FavoriteProducts userData={userData}/>}/>

        <Route path="/products/:idProduct" element={<ProductPage userData={userData} cartLS={cartLS} setCartLS={setCartLS} />}/>

        <Route path="/search/:searchPath" element={<SearchPage/>}/>

        <Route path="/search/:searchPath/:orderSearch" element={<SearchPage/>}/>

        <Route path="/search" element={<Navigate replace to="/"/>}/>
        
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
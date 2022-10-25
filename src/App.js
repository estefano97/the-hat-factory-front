import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import HatPage from './components/HatPage';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';


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

  useEffect(() => {
    console.log("La data desde su useEffect", userData);
    window.localStorage.setItem("loggedTHF", JSON.stringify(userData));
  }, [userData]);
  
  return (
    <div>
      <Header userData={userData}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
        path="/login"
        element={<Login userData={userData} setUserData={setUserData}/>}/>
        <Route path="/profile" element={<Profile userData={userData} setUserData={setUserData} initialUserData={initialUserData}/>} />
        <Route path="/register" element={<Register userData={userData} setUserData={setUserData}/>}/>
        <Route path="/products/:productName" element={<HatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

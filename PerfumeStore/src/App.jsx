import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './page/Home/Home';
import Order from './page/Order/Order';
import Cart from './page/Cart/Cart';
import Dashboard from './page/Admin/Dashboard/Dashboard';
import NoPage from './page/Nopage/NoPage';
import MyState from './context/data/myState';
import Login from './page/registration/Login';
import Signup from './page/registration/Signup';
import ProductInfo from './page/productInfo/ProductInfo';
import AddProduct from './page/Admin/page/AddProduct';
import UpdateProduct from './page/Admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './page/Allproducts/AllProducts';
import ResetPasswordPage from './page/registration/ResetPasswordPage';
import Loader from './components/Loader/Loader';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;


export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  }
  else {
    return <Navigator to={'/login'} />
  }
}


// const ProtectedRouteForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem('user'))
//   const adminRoute = 'kushalhpipaliya01@gmail.com';
//   if (admin.user.email === adminRoute) {
//     return children
//   } else {
//     return <Navigate to={'/'} />;
//   }
// }

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  const adminRoute = import.meta.env.VITE_ADMIN_EMAIL;

  if (admin && admin.user.email === adminRoute) {
    return children;
  } else {
    return <Navigate to={'/'} />;
  }
};

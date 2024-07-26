import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navigate } from 'react-router-dom';
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



function App() {
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
  )
}

export default App;

// user

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  }
  else {
    return <Navigator to={'/login'} />
  }
}

// admin

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email === 'kushalhpipaliya01@gmail.com') {
    return children
  } else {
    return <Navigate to={'/'} />;
  }
}


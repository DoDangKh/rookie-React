// import './App.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
// import { Route, Router } from 'react-router-dom'
import login from './page/Login/Login'
import Register from './page/Register/Register'
import Categories from './page/Admin/Categories/Categories';
import { Box } from '@mui/material';
import addCategories from './page/Admin/Categories/add/addCategories';
import UpdateCategory from './page/Admin/Categories/update/updateCategory';
import AddProduct from './page/Admin/Product/add/addProduct';
import Product from './page/Admin/Product/Products';
import UpdateProduct from './page/Admin/Product/update/UpdateProduct';
import MainPage from './page/User/MainPage/MainPage';
import Search from './page/User/MainPage/Search/Search';
import ProductDetailPage from './page/User/ProductDetail/ProductDetail';
import AdminLogin from './page/Admin/Login/AdminLogin';
import User from './page/Admin/Users/User';
import UserDetail from './page/Admin/Users/UserDetail/UserDetail';
import CartPage from './page/User/Cart/Cart';
import OrderPage from './page/User/Orders/Orders';

function App() {
  return (

    <Router>
      <Routes>
        <Route Component={Header}>
          <Route path='/product/:id' exact Component={ProductDetailPage}></Route>
          <Route path="login" exact Component={login} />
          <Route path="register" exact Component={Register} />
          <Route path='*' exact Component={MainPage} />
          <Route path='search' exact Component={Search} />
          <Route path='cart' exact Component={CartPage} />
          <Route path='order' exact Component={OrderPage} />
        </Route>
        <Route path='Admin/login' exact Component={AdminLogin} />
        <Route Component={SideBar} path='Admin'>
          <Route path='user/:id' exact Component={UserDetail} />
          <Route path='Category' exact Component={Categories}></Route>
          <Route path='Category/:id' exact Component={UpdateCategory}></Route>
          <Route path='Category/add' exact Component={addCategories}></Route>
          <Route path="Product/add" exact Component={AddProduct} />
          <Route path="Product" exact Component={Product} />
          <Route path="Product/:id" exact Component={UpdateProduct} />
          <Route path='user' exact Component={User} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App
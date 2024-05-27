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

function App() {
  return (

    <Router>
      <Routes>
        <Route Component={Header}>
          <Route path="login" exact Component={login} />
          <Route path="register" exact Component={Register} />
        </Route>
        <Route Component={SideBar} path='Admin'>
          <Route path='Category' exact Component={Categories}></Route>
          <Route path='Category/:id' exact Component={UpdateCategory}></Route>
          <Route path='Category/add' exact Component={addCategories}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
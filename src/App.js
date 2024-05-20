// import './App.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


// import { Route, Router } from 'react-router-dom'
import login from './page/Login/Login'
import Register from './page/Register/Register'
import Admin from './page/Admin/Admin';

function App() {
  return (
    <div className="h-100">
      <Router>
        <Routes>
          <Route path="/login" exact Component={login} />
          <Route path="/Register" exact Component={Register} />
          <Route path='/Admin' exact Component={Admin} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
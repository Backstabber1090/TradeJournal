import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Signin from "./components/signin/Signin"
import Login from "./components/login.component"
import Profile from "./components/profile.component"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Profile" Component={Profile} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

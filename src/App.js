import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import "./styles.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userRole: null,
    };
  }

  setAuthentication = (authStatus, role) => {
    this.setState({ isAuthenticated: authStatus, userRole: role });
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={this.state.isAuthenticated ? <Dashboard role={this.state.userRole} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<Login setAuthentication={this.setAuthentication} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/dashboard"
              element={this.state.isAuthenticated ? <Dashboard role={this.state.userRole} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

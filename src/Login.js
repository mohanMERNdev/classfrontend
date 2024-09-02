import React from 'react';
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await fetch('https://classbackend-reut.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.props.setAuthentication(true, data.role);
        this.props.navigate('/dashboard');
      } else {
        this.setState({ error: data.message });
      }
    } catch (err) {
      this.setState({ error: 'Error logging in. Please try again.' });
    }
  };

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />

          <button type="submit">Login</button>
        </form>
        <p>
          New user? <a href="/register">Register</a>
        </p>
      </div>
    );
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(Login);

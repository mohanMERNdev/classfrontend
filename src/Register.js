import React from 'react';
import { useNavigate } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: 'student',
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = this.state;

    try {
      const response = await fetch('https://classbackend-reut.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        this.props.navigate('/login');
      } else {
        this.setState({ error: data.message });
      }
    } catch (err) {
      this.setState({ error: 'Error registering. Please try again.' });
    }
  };

  render() {
    return (
      <div className="register">
        <h2>Register</h2>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />

          <label>Role:</label>
          <select name="role" value={this.state.role} onChange={this.handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit">Register</button>
        </form>
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

export default withRouter(Register);

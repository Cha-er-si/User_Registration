import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if Logged In
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div>
        <h1>Sign In</h1>
        <br />
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <br />
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <br />
            Don't have an account? <Link to='/register'>Sign Up</Link>
            <br />
            <br />
            <input type='submit' value='Login' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

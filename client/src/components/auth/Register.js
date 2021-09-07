import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match!', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if Registered
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div>
        <h1>Sign Up</h1>
        <br />
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <div className='form-group'>
              <input
                className='form-control'
                type='name'
                name='name'
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e) => onChange(e)}
                //required
              />
            </div>
            <br />
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => onChange(e)}
                //required
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
                //minLength='6'
              />
            </div>
            <br />
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                name='password2'
                id='password2'
                placeholder='Confirm Password'
                value={password2}
                onChange={(e) => onChange(e)}
                //minLength='6'
              />
            </div>
            <br />
            Already have an account? <Link to='/'>Sign In</Link>
            <br />
            <br />
            <input type='submit' value='Register' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

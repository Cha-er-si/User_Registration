import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <Fragment>
      <div>
        <h1>Sign In</h1>
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
            <input type='submit' value='Login' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;

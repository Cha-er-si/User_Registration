import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password do not match');
    } else {
      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <div>
        <h1>Sign Up</h1>
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
                required
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
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                name='password2'
                id='password2'
                placeholder='Password2'
                value={password2}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <br />
            <input type='submit' value='Register' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;

import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    birthday: '',
    address: '',
    status: '',
    bio: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const { birthday, address, status, bio, facebook, twitter, instagram } =
    formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <small>Fields with * are required</small>
      <br />
      <br />
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>Select your civil status</option>
            <option value='Single'>Single</option>
            <option value='Married'>Married</option>
            <option value='Divorced'>Divorced</option>
          </select>
        </div>
        <br />
        <div className='form-group'>
          <small className='form-text'>Birthday</small>
          <input
            className='form-control'
            type='date'
            placeholder='Birthday'
            name='birthday'
            value={birthday}
            onChange={(e) => onChange(e)}
          />
        </div>
        <br />
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={(e) => onChange(e)}
          />
        </div>
        <br />
        <div className='form-group'>
          <small className='form-text'>Tell us a little about yourself</small>
          <textarea
            className='form-control'
            placeholder='A short bio about yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <br />
        <div>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-dark'
          >
            Add Social Network Links
          </button>
          <span> Optional</span>
        </div>
        <br />

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <input
                className='form-control'
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <br />
            <div className='form-group social-input'>
              <input
                className='form-control'
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <br />
            <div className='form-group social-input'>
              <input
                className='form-control'
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <br />
        <input type='submit' className='btn btn-primary' />
        <Link className='btn btn-light' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));

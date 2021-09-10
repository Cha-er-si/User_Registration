import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Moment from 'react-moment';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
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

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      birthday: loading || !profile.birthday ? '' : profile.birthday,
      address: loading || !profile.address ? '' : profile.address,
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading]);

  const { birthday, address, status, bio, facebook, twitter, instagram } =
    formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
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
          Your Birthday :{' '}
          <Moment format='MM/DD/YYYY'>{profile.birthday}</Moment>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

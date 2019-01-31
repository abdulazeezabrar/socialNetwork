import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';


class Profile extends Component {
  componentDidMount(){
    const handle = this.props.match.params.handle;
    this.props.getProfileByHandle(handle);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.pageNotFound && this.props.profile.loading){
      this.props.clearErrors();
      this.props.history.push('/not-found');
    }
  }

  render () {
    const {profile, loading}  = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div>
        {profileContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  pageNotFound: state.errors.noprofile
});

const clearErrors = () => {
  return({type: "GET_ERRORS",payload: {} });
}

export default connect(mapStateToProps, { getProfileByHandle, clearErrors })(Profile);

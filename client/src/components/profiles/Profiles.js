import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
import Spinner from '../common/Spinner';

class Profiles extends Component {
  componentDidMount(){
    this.props.getProfiles();
  }

  render () {
    const {profiles, loading} = this.props.profile;
    let profileItems;
    if(profiles === null || loading){ // while getting the profiles display the spinner component
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0){
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <div>There is no Developer to looking for...</div>;
      }
    }

    return(
      <div className="profiles">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

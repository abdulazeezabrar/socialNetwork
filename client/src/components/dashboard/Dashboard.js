import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
class Dashboard extends React.Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }
  onDelete(){
    this.props.deleteProfile();
  }
  render () {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let DashboardContent;
    // if profile in null or loading true
    if(profile === null || loading){
      DashboardContent =  <Spinner />;
    } else {
      // if there is a profile
      if(Object.keys(profile).length > 0 ){
        DashboardContent = (<div>
          <p className="">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education educations={profile.education} />
          <div style={{marginBottom: '60px'}} />
          <button className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete My Acount</button>
        </div>);
      } else { // if the user didn't create the profile yet
        DashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not create profile yet , plese add some info</p>
            <Link to="/create-profile" className="btn btn-bg btn-primary">Create Profile</Link>
          </div>
        );
      }

    }

    return (
      <div className='dashboard'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
            {DashboardContent}
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = state => {
  return{
      auth: state.auth,
      profile: state.profile
  }
};

export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard);

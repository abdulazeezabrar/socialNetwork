import React from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
class Dashboard extends React.Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }
  render () {
    return (<div><h1>Dashboard</h1></div>);
  }
}

export default connect(null, {getCurrentProfile})(Dashboard);

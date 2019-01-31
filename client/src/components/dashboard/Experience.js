import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

  onClick(id){
    this.props.deleteExperience(id);
  }

  render () {
    const Body = () => this.props.experience.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            {moment(exp.from).format('YYYY/MM/DD')} - { exp.to === null ? " Now" : moment(exp.to).format('YYYY/MM/DD') }
          </td>
          <td><button className="btn btn-danger" onClick={this.onClick.bind(this, exp._id)}>Delete</button></td>
        </tr>
      ));

    return(
      <div className="experiece-table">
        <h4 className="mb-3">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Years</th>
            </tr>
          </thead>

          <tbody>
            <Body />
          </tbody>

        </table>
      </div>
    );
  }
}

export default connect(null, {deleteExperience})(Experience);

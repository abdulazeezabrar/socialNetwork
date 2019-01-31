import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  onClick(id){
    this.props.deleteEducation(id);
  }

  render () {
    const Body = () => this.props.educations.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            {moment(edu.from).format('YYYY/MM/DD')} - { edu.to === null ? " Now" : moment(edu.to).format('YYYY/MM/DD') }
          </td>
          <td><button className="btn btn-danger" onClick={this.onClick.bind(this, edu._id)}>Delete</button></td>
        </tr>
      ));

    return(
      <div className="education-table">
        <h4 className="mb-3">Education Credentials</h4>
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

export default connect(null, {deleteEducation})(Education);

import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated) {this.props.history.push('/dashboard')}
    if(nextProps.errors) this.setState({errors: nextProps.errors});
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated) this.props.history.push('/dashboard')
  }

  render () {
    const { errors } = this.state;
    return(
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup type="email" error={errors.email} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                <TextFieldGroup type="password" error={errors.password} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});


export default connect(mapStateToProps, {loginUser})( withRouter(Login) );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

class Posts extends Component{
  componentDidMount(){
    this.props.getPosts();
  }
  render(){
    return(
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <PostFeed />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect( null, { getPosts })( Posts );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import Spinner from '../common/Spinner';

class PostFeed extends Component{
  render(){
    const {posts, loading} = this.props.post;
    if(posts === null || loading) return <Spinner />
    else {
      return posts.map((post, index) => (
        <PostItem key={post._id} post={post} />
      ));
    }
  }

}
const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(PostFeed);

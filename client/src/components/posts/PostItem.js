import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {deletePostById, likePost, unLikePost} from '../../actions/postActions';

class PostItem extends Component{

  onDeleteClick(id){
    this.props.deletePostById(id);
  }

  onLikeClick(id){
    this.props.likePost(id);
  }

  onUnlikeClick(id){
    this.props.unLikePost(id);
  }

  findUserLike(likes) {
    return (likes.filter(like => like.user === this.props.auth.user.id).length > 0)
  }


  render(){
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick.bind(this, post._id)}>
              <i className={"fa fa-thumbs-up " + (this.findUserLike(post.likes) ? " text-info" : "")  }></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1" onClick={this.onUnlikeClick.bind(this, post._id)}>
              <i className="text-secondary fa fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            { auth.user.id === post.user &&
              <button type="button" className="btn btn-danger mr-1" onClick={this.onDeleteClick.bind(this, post._id)}>
                <i className="fa fa-times" />
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePostById, likePost, unLikePost })(PostItem);

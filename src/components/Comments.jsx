import React, { Component } from 'react';
import { getComments } from '../api'
import CommentCard from './CommentCard'


class Comments extends Component {
    state = { comments: [] }
    componentDidMount() {
        getComments(this.props.article_id).then(comments => {
            this.setState({ comments })
        })
    }
    render() {
        const { comments } = this.state
        return (
            <div className="comment-container">
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment_id={comment.comment_id} />
                })}
            </div>
        );
    }
}

export default Comments;
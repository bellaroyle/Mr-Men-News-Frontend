import React, { Component } from 'react';
import { getComments } from '../api'
import CommentCard from './CommentCard'
import ErrorPage from './ErrorPage'


class Comments extends Component {
    state = {
        comments: [],
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getComments(this.props.article_id, this.props.limit).then(comments => {
            this.setState({ comments })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    render() {
        const { comments, hasError, errorMessage } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else return (
            <div className="comment-container">
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment_id={comment.comment_id} />
                })}
            </div>
        );
    }
}

export default Comments;
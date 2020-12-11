import React, { Component } from 'react';
import { getComments, postComment, deleteComment } from '../api'
import CommentCard from './CommentCard'
import CommentAdder from './CommentAdder'
import ErrorPage from './ErrorPage'


import { UserContext } from '../contexts/User'


class Comments extends Component {
    state = {
        comments: [],
        hasError: false,
        errorMessage: '',
        isLoading: true
    }
    componentDidMount() {
        getComments(this.props.article_id, this.props.limit).then(comments => {
            this.setState({ comments, isLoading: false })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }


    addComment = (comment) => {
        // this.props.updateCommentCount(1)
        const { article_id } = this.props
        const { loggedInUser } = this.context
        postComment(comment, loggedInUser, article_id).then(comment => {
            this.setState(currState => {
                return {
                    comments: [comment, ...currState.comments]
                }
            })
        })
    }
    removeComment = (commentId) => {
        // this.props.updateCommentCount(-1)
        this.setState(currState => {
            const newComments = currState.comments.filter(comment => {
                return comment.comment_id !== commentId
            })
            return { comments: [...newComments] }
        })

        deleteComment(commentId)
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }

    render() {
        const { comments, hasError, errorMessage, isLoading } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else if (isLoading) {
            return <p>loading...</p>
        }
        else return (
            <div className="comment-container">
                <CommentAdder addComment={this.addComment} />
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment_id={comment.comment_id} removeComment={this.removeComment} />
                })}
            </div>
        );
    }
}
Comments.contextType = UserContext

export default Comments;
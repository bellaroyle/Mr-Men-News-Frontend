import React, { Component } from 'react';
import { getCommentById, updateCommentVote } from '../api';
import { Card, CardContent } from '@material-ui/core/';
import { formatDate } from '../utils'
import Vote from './Vote'
import { Link } from '@reach/router'
import AvatarDisplay from './AvatarDisplay'
import ErrorPage from './ErrorPage'

class CommentCard extends Component {
    state = {
        comment: {},
        hasError: false,
        errorMessage: '',
        isLoading: true
    }
    componentDidMount() {
        getCommentById(this.props.comment_id).then(comment => {
            this.setState({ comment, isLoading: false })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    handleVote = (inc) => {
        const { comment_id } = this.state.comment
        this.setState((currState) => {
            const { votes, ...restOfComment } = currState.comment
            const newState = {
                comment: { ...restOfComment, votes: votes + inc }
            }
            return newState
        })
        updateCommentVote(inc, comment_id)
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    render() {
        const {
            author,
            body,
            comment_id,
            created_at,
            votes
        } = this.state.comment
        if (this.state.hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />
        }
        else if (this.state.isLoading) {
            return <p>loading ...</p>
        }
        else return (
            <Card key={comment_id}>
                <CardContent >
                    <div className='card-header'>
                        <div className="post-by">
                            <AvatarDisplay author={author} />
                            <p><Link to={`/users/${author}`} style={{ textDecoration: 'none' }} > {author}</Link> <br />{formatDate(created_at)}</p>
                        </div>
                        <Vote handleVote={this.handleVote} votes={votes} />
                    </div>
                    <p className="comment-body">{body}</p>

                </CardContent>
            </Card>
        );
    }
}

export default CommentCard;
import React, { Component } from 'react';
import { getCommentById, updateCommentVote } from '../api';
import { Card, CardContent } from '@material-ui/core/';
import { formatDate } from '../utils'
import Vote from './Vote'

class CommentCard extends Component {
    state = { comment: {} }
    componentDidMount() {
        getCommentById(this.props.comment_id).then(comment => {
            this.setState({ comment })
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
    }
    render() {
        const {
            author,
            body,
            comment_id,
            created_at,
            votes
        } = this.state.comment
        return (
            <Card key={comment_id}>
                <CardContent >
                    <div className='card-header'>
                        <p className="post-by">Comment by <strong>{author}</strong> on {formatDate(created_at)}</p>
                        <Vote handleVote={this.handleVote} votes={votes} />
                    </div>
                    <p className="comment-body">{body}</p>

                </CardContent>
            </Card>
        );
    }
}

export default CommentCard;
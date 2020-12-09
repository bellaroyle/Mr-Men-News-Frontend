import React, { Component } from 'react';
import { getCommentById, updateCommentVote } from '../api';
import { Card, CardContent } from '@material-ui/core/';
import { formatDate } from '../utils'
import Vote from './Vote'
import { Link } from '@reach/router'
import AvatarDisplay from './AvatarDisplay'

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
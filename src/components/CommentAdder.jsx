import React, { Component } from 'react';
import { UserContext } from '../contexts/User'

class CommentAdder extends Component {
    state = {
        comment: ''
    }

    handleChange = (event) => {
        const comment = event.target.value
        this.setState({ comment })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { comment } = this.state
        const { addComment } = this.props
        addComment(comment)
        this.setState({ comment: '' })

    }

    render() {
        if (this.context.loggedInUser) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Commenting as {this.context.loggedInUser}:
                    <textarea
                            id="post-a-comment"
                            rows='1' cols='40'
                            value={this.state.comment}
                            onChange={this.handleChange}>
                        </textarea>
                    </label>
                    <button type='submit'>Post</button>
                </form>
            );
        }
        else return (
            <p>please login to post a comment</p>
        )
    }
}
CommentAdder.contextType = UserContext

export default CommentAdder;
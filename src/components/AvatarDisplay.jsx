import React, { Component } from 'react';
import { getUser } from '../api';
import Avatar from '@material-ui/core/Avatar';
import ErrorPage from './ErrorPage'

class AvatarDisplay extends Component {
    state = {
        user: {},
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getUser(this.props.author).then((user) => {
            this.setState({ user })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    render() {
        const { user, hasError, errorMessage } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else return <Avatar src={user.avatar_url} alt={`${user.username}'s avatar`} />
    }
}

export default AvatarDisplay;
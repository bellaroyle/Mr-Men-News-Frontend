import React, { Component } from 'react';
import { getUser } from '../api'
import ErrorPage from './ErrorPage'
import CircularProgress from '@material-ui/core/CircularProgress';


class UserProfile extends Component {
    state = {
        user: {},
        isLoading: false,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getUser(this.props.username).then(user => {
            this.setState({ user, isLoading: false })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    render() {
        const { username, avatar_url, name } = this.state.user
        if (this.state.hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />
        }
        else if (!this.state.isLoading) {
            return (
                <div id="user-info-container">
                    <h2>{username} <span id="name">{`(${name})`}</span></h2>
                    <img src={avatar_url} alt={`${username}'s avatar`} width="150" ClassName="avatar-img" />
                </div>
            );
        }
        else return <CircularProgress />

    }
}

export default UserProfile;
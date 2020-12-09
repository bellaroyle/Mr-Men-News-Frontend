import React, { Component } from 'react';
import { getUser } from '../api'

/**
 * {
    "username": "jessjelly",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
    "name": "Jess Jelly"
  }
 */

class UserProfile extends Component {
    state = { user: {}, isLoading: false }
    componentDidMount() {
        getUser(this.props.username).then(user => {

            this.setState({ user, isLoading: false })
        })
    }
    render() {
        const { username, avatar_url, name } = this.state.user
        if (!this.state.isLoading) {
            return (
                <div id="user-info-container">
                    <h2>{username} <span id="name">{`(${name})`}</span></h2>
                    <img src={avatar_url} alt={`${username}'s avatar`} width="150" ClassName="avatar-img" />
                </div>
            );
        }

    }
}

export default UserProfile;
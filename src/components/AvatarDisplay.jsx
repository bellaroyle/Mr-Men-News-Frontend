import React, { Component } from 'react';
import { getUser } from '../api';
import Avatar from '@material-ui/core/Avatar';
class AvatarDisplay extends Component {
    state = { user: {}, }
    componentDidMount() {
        getUser(this.props.author).then((user) => {
            this.setState({ user })
        })
    }
    render() {
        const { user } = this.state
        return <Avatar src={user.avatar_url} alt={`${user.username}'s avatar`} />
    }
}

export default AvatarDisplay;
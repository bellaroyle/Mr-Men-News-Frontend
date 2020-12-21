import React, { Component } from 'react';
import { getArticles, getUser } from '../api'
import ErrorPage from './ErrorPage'
import CircularProgress from '@material-ui/core/CircularProgress';
import Article from './Article'
import SortBy from './SortBy'
import Topics from './Topics'

class UserProfile extends Component {
    state = {
        user: {},
        articles: [],
        topic: 'all',
        sort_by: 'created_at',
        order: 'desc',
        isLoading: true,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getUser(this.props.username)
            .then(user => {
                return getArticles(null, null, null, user.username).then(articles => {
                    return [user, articles]
                })
            })
            .then(([user, articles]) => {
                this.setState({ user, articles, isLoading: false })
            })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        const newTopic = prevState.topic !== this.state.topic
        const newSort = prevState.sort_by !== this.state.sort_by
        const newOrder = prevState.order !== this.state.order
        const { topic, sort_by, order, user } = this.state
        if (newTopic || newSort || newOrder) {
            getArticles(topic, sort_by, order, user.username).then(articles => {
                this.setState({ articles })
            })
                .catch(err => {
                    const { response: { status, data: { msg } }, } = err
                    this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
                })
        }
    }
    changeTopic = (topic) => {
        this.setState({ topic })
    }


    changeSort = (sort) => {
        const sortArray = sort.split(' ')

        this.setState({ sort_by: sortArray[0], order: sortArray[1] })
    }
    render() {

        const { user: { username, avatar_url, name },
            articles,
            hasError,
            errorMessage
        } = this.state

        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else if (this.state.isLoading) {
            return <CircularProgress />
        }
        else return (
            <div id='articles-list-container'>
                <div id="user-info-container">
                    <div id="avatar-img-container">
                        <img src={avatar_url} alt={`${username}'s avatar`} height="130" className="avatar-img" />
                    </div>
                    <div id="name-and-username">
                        <h2>{username}</h2>
                        <h3>{`(${name})`}</h3>
                    </div>
                </div>
                <div id='topics-and-sortBy'>
                    <Topics changeTopic={this.changeTopic} />
                    <br />
                    <SortBy changeSort={this.changeSort} />
                    <br />
                </div>
                <ul id="article-card-container">
                    {articles.map(article => {
                        return <Article article_id={article.article_id} key={article.article_id} />
                    })}
                </ul>
            </div>

        );


    }
}

export default UserProfile;
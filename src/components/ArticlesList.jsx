import React, { Component } from 'react';
import { getArticles } from '../api'
import Article from './Article'
import Topics from './Topics'
import CircularProgress from '@material-ui/core/CircularProgress';
import SortBy from './SortBy'
import ErrorPage from './ErrorPage'


class ArticlesList extends Component {
    state = {
        articles: [],
        topic: 'all',
        sort_by: 'created_at',
        order: 'desc',
        isLoading: true,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getArticles().then((articles => {
            this.setState({ articles, isLoading: false })
        }))
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        const newTopic = prevState.topic !== this.state.topic
        const newSort = prevState.sort_by !== this.state.sort_by
        const newOrder = prevState.order !== this.state.order
        const { topic, sort_by, order } = this.state
        if (newTopic || newSort || newOrder) {
            getArticles(topic, sort_by, order).then(articles => {
                this.setState({ articles })
            })
                .catch(err => {
                    const { response: { status, data: { msg } }, } = err
                    this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
                })
        }
    }
    addToQuery = (toSortBy) => {
        const sortArray = toSortBy.split(' ')
        const { topic_slug } = this.props
        getArticles(topic_slug, sortArray[0], sortArray[1]).then(articles => {
            this.setState({ articles })
        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    changeTopic = (topic) => {
        this.setState({ topic })
    }
    changeSort = (sort) => {
        const sortArray = sort.split(' ')

        this.setState({ sort_by: sortArray[0], order: sortArray[1] })
    }




    render() {
        const { articles, isLoading, hasError } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />
        }
        else if (isLoading) {
            return <CircularProgress />
        }
        else {
            return (
                <>
                    <div id='topics-and-sortBy'>
                        <Topics changeTopic={this.changeTopic} />
                        <SortBy changeSort={this.changeSort} />
                    </div>
                    <ul id="article-card-container">
                        {articles.map(article => {
                            return <Article article_id={article.article_id} key={article.article_id} />
                        })}
                    </ul>
                </>

            );
        }
    }
}

export default ArticlesList;
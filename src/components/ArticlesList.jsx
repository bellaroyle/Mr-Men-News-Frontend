import React, { Component } from 'react';
import { getArticles } from '../api'
import Article from './Article'
import { capitalise } from '../utils'
import CircularProgress from '@material-ui/core/CircularProgress';
import SortBy from './SortBy'
import ErrorPage from './ErrorPage'


class ArticlesList extends Component {
    state = {
        articles: [],
        currentTopic: 'all',
        isLoading: true,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        const { topic_slug } = this.props
        getArticles(topic_slug).then((articles => {
            this.setState({ articles, isLoading: false })
        }))
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        const newTopic = prevProps.topic_slug !== this.props.topic_slug
        if (newTopic) {
            getArticles(this.props.topic_slug).then(articles => {
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


    render() {
        const { articles, isLoading, hasError } = this.state
        const { topic_slug } = this.props
        if (hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />
        }
        else if (isLoading) {
            return <CircularProgress />
        }
        else {
            return (
                <>
                    <h2>{capitalise(topic_slug)}</h2>
                    <SortBy addToQuery={this.addToQuery} />
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
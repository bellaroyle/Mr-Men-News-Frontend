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
    } s
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
                <div >
                    <div id='articles-list-container'>
                        <div id='topics-and-sortBy'>
                            <Topics changeTopic={this.changeTopic} />
                            <br />
                            <SortBy changeSort={this.changeSort} />
                            <br />
                        </div>
                    </div>
                    <ul id="article-card-container">
                        {articles.map(article => {
                            return <Article article={article} key={article.article_id} />
                        })}
                    </ul>
                </div>

            );
        }
    }
}

export default ArticlesList;
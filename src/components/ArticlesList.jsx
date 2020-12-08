import React, { Component } from 'react';
import { getArticles } from '../api'
import Article from './Article'
import { capitalise } from '../utils'
import CircularProgress from '@material-ui/core/CircularProgress';


class ArticlesList extends Component {
    state = {
        articles: [],
        currentTopic: 'all',
        isLoading: true
    }
    componentDidMount() {
        const { topic_slug } = this.props
        getArticles(topic_slug).then((articles => {
            this.setState({ articles, isLoading: false })
        }))
    }
    componentDidUpdate(prevProps, prevState) {
        const newTopic = prevProps.topic_slug !== this.props.topic_slug
        if (newTopic) {
            getArticles(this.props.topic_slug).then(articles => {
                this.setState({ articles })
            })
        }
    }


    render() {
        const { articles, isLoading } = this.state
        const { topic_slug } = this.props
        if (isLoading) {
            return <CircularProgress />
        }
        else {
            return (
                <>
                    <h2>{capitalise(topic_slug)}</h2>
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
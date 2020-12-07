import React, { Component } from 'react';
import { getArticles } from '../api'
import ArticleCard from './ArticleCard'
import { capitalise } from '../utils'
import { getAllByAltText } from '@testing-library/react';

class ArticlesList extends Component {
    state = {
        articles: [],
        currentTopic: 'all'
    }
    componentDidMount() {
        const { topic_slug } = this.props
        getArticles(topic_slug).then((articles => {
            this.setState({ articles })
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
        const { articles } = this.state
        const { topic_slug } = this.props
        return (
            <>
                <h2>{capitalise(topic_slug)}</h2>
                <ul>
                    {articles.map(article => {
                        return <ArticleCard article_id={article.article_id} key={article.article_id} />
                    })}
                </ul>
            </>

        );
    }
}

export default ArticlesList;
// import { getAllByAltText } from '@testing-library/react';
import React, { Component } from 'react';
import { getArticleById, updateVote } from '../api'
import ArticleCard from './ArticleCard'


class Article extends Component {
    state = {
        article: {}, isLoading: true
    }

    componentDidMount() {
        getArticleById(this.props.article_id).then(article => {
            this.setState({ article, isLoading: false })
        })
    }

    handleVote = (inc) => {
        const { article_id } = this.state.article
        this.setState((currState) => {
            const { votes, ...restOfArticle } = currState.article
            const newState = {
                article: { ...restOfArticle, votes: votes + inc },
                isLoading: false
            }
            return newState
        })
        updateVote(inc, article_id)

    }

    render() {
        if (!this.state.isLoading) {
            return <ArticleCard article={this.state.article} handleVote={this.handleVote} limit={this.props.limit} />
        }
        else return <></>
    }
}

export default Article;
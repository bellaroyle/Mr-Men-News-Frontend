// import { getAllByAltText } from '@testing-library/react';
import React, { Component } from 'react';
import { getArticleById, updateVote } from '../api'
import ArticleCard from './ArticleCard'
import ErrorPage from './ErrorPage'

class Article extends Component {
    state = {
        article: {},
        isLoading: true,
        hasError: false,
        errorMessage: ''
    }

    componentDidMount() {
        if (this.props.article) {
            this.setState({ article: this.props.article, isLoading: false })
        }
        else {
            getArticleById(this.props.article_id).then(article => {
                this.setState({ article, isLoading: false })
            }).catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     // console.log('updating')
    //     // comemntcount updated then set state 
    //     const commentsUpdated = prevState.article.comment_count === this.state.comment_count
    //     if (commentsUpdated) {
    //         // this.setState()
    //         getArticleById(this.state.article.article_id).then(article => {
    //             this.setState({ article, isLoading: false })
    //         })


    //     }
    // }
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
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })

    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />
        }
        if (!this.state.isLoading) {
            return (
                <div id="single-article">
                    <ArticleCard article={this.state.article} handleVote={this.handleVote} limit={this.props.limit} />
                </div>
            )
        }
        else return null
    }
}

export default Article;
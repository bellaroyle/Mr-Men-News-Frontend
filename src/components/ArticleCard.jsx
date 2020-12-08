// import { getAllByAltText } from '@testing-library/react';
import React, { Component } from 'react';
import { getArticleById, updateVote } from '../api'
import { formatDate } from '../utils'
import { Link } from '@reach/router'
import { Card, CardActions, CardContent, Button } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
// import { KeyboardArrowUpIcon, KeyboardArrowDownIcon } from '@material-ui/icons'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class ArticleCard extends Component {
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
        updateVote(inc, article_id).then(article => {
            this.setState({ article })
        })
    }

    render() {
        const {
            article_id,
            author,
            body,
            comment_count,
            created_at,
            title,
            topic,
            votes
        } = this.state.article

        return (

            <Card variant="outlined" key={article_id}>
                {(this.state.isLoading ? <CardContent><CircularProgress /></CardContent> :
                    <CardContent >
                        <div className='card-header'>
                            <p className="post-by">Posted by <strong>{author}</strong> on {formatDate(created_at)}</p>
                            <Link to={`/topics/${topic}`} style={{ textDecoration: 'none' }}><Button>{topic}</Button></Link>

                        </div>

                        <h3>{title}</h3>
                        <p>{body}</p>

                        <div className='card-footer'>
                            <div className="votes-container">
                                <IconButton aria-label="upVote" onClick={() => { this.handleVote(1) }}>
                                    <ExpandLessIcon />
                                </IconButton>
                                <p>{votes} Votes</p>
                                <IconButton aria-label="downVote" onClick={() => { this.handleVote(-1) }}>
                                    <ExpandMoreIcon />
                                </IconButton>
                            </div>
                            <p>{comment_count} Comments</p>
                        </div>
                    </CardContent>
                )}
            </Card>

        );
    }
}

export default ArticleCard;
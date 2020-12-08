// import { getAllByAltText } from '@testing-library/react';
import React, { Component } from 'react';
import { getArticleById } from '../api'
import { formatDate, capitalise } from '../utils'
import { Link } from '@reach/router'
import { Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core/';




class ArticleCard extends Component {
    state = {
        article: {}
    }

    componentDidMount() {
        getArticleById(this.props.article_id).then(article => {
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

            <Card variant="outlined">
                {/* <CardHeader>
                    <p className="post-by">Posted by <strong>{author}</strong> on {formatDate(created_at)}</p>
                    <p className="topic-stamp">{capitalise(topic)}</p>
                </CardHeader> */}
                <CardContent >
                    <div className='card-header'>
                        <p className="post-by">Posted by <strong>{author}</strong> on {formatDate(created_at)}</p>
                        <Link to={`/topics/${topic}`} style={{ textDecoration: 'none' }}><Button>{topic}</Button></Link>

                    </div>

                    <h3>{title}</h3>
                    <p>{body}</p>
                </CardContent>
            </Card>
            // <Link to={`/articles/${article_id}`} key={article_id} style={{ textDecoration: 'none' }} >
            //     <div className="article-card">
            //         <div className='card-header'>
            //             <p className="post-by">Posted by <strong>{author}</strong> on {formatDate(created_at)}</p>
            //             <p className="topic-stamp">{capitalise(topic)}</p>
            //         </div>

            //         <h3>{title}</h3>
            //         <p>{body}</p>

            //         <div>

            //         </div>
            //     </div>

            // </Link>
        );
    }
}

export default ArticleCard;
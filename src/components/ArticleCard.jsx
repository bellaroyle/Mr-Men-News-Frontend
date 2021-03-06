import React from 'react';
// import { useForceUpdate } from '../hooks';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AvatarDisplay from './AvatarDisplay'
import Vote from './Vote'
import Comments from './Comments'
import { formatDate, capitalise } from '../utils'
import { Link } from '@reach/router'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    p: {
        maxHeight: '500px',
        overflow: 'hidden',
    },
    pos: {
        marginBottom: 1,
    },
}));

export default function ArticleCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let {
        article_id,
        author,
        body,
        comment_count,
        created_at,
        title,
        topic,
        votes
    } = props.article
    let commentLimit = props.limit
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // const updateCommentCount = (inc) => {
    //     console.log(comment_count)
    //     comment_count = inc + parseInt(comment_count)
    //     console.log(comment_count)

    // }

    return (
        <Card className={classes.root} id="article-card">
            <CardContent >
                <div className='card-header'>
                    <div className="post-by">
                        <AvatarDisplay author={author} />
                        <p><Link to={`/users/${author}`} style={{ textDecoration: 'none' }} > {author}</Link> <br />{formatDate(created_at)}</p>
                    </div>
                    <p><strong>{capitalise(topic)}</strong></p>

                </div>
                <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }} className="card-title">
                    <h3>{title}</h3>
                </Link>

                <p className="article-body">{body}</p>

            </CardContent>
            {!props.limit ? <>
                <CardActions disableSpacing>
                    <div id='card-footer'>
                        <div id="vote-buttons">


                            <Vote handleVote={props.handleVote} votes={votes} />
                        </div>
                        <div id='comment-dropdown'>
                            <p>{comment_count} Comments
                    <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon fontSize="large" id="show-comments" />
                                </IconButton></p>
                        </div>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <p id="showing_info">Showing {props.limit ? 'All' : '5'} Comments</p>
                        <Comments article_id={article_id} limit={commentLimit || '5'} updateCommentCount={props.updateCommentCount} />
                        {(props.limit ? null : <p id="see-entire-article" > To see all comments, <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }} >view the article here</Link></p>)}

                    </CardContent>
                </Collapse>
            </>
                : <>
                    <div id='card-footer'>
                        <div id="vote-buttons">


                            <Vote handleVote={props.handleVote} votes={votes} />
                        </div>
                        <p id="comment-count-on-single-page">{comment_count} Comments</p>
                    </div>
                    <p id="showing_info">Showing All Comments</p>
                    <Comments article_id={article_id} limit={commentLimit || '5'} updateCommentCount={props.updateCommentCount} />
                    {/* {(props.limit ? null : <p id="see-entire-article" > To see all comments, <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }} >view the article here</Link></p>)} */}
                </>
            }
        </Card >
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Vote from './Vote'
import Comments from './Comments'
import Button from '@material-ui/core/Button';
import { formatDate } from '../utils'
import { Link } from '@reach/router'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: 10,

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
}));

export default function ArticleCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const {
        article_id,
        author,
        body,
        comment_count,
        created_at,
        title,
        topic,
        votes
    } = props.article

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} id="article-card">
            <CardContent >
                <div className='card-header'>
                    <p className="post-by">Posted by <strong>{author}</strong> on {formatDate(created_at)}</p>
                    <Link to={`/topics/${topic}`} style={{ textDecoration: 'none' }}><Button>{topic}</Button></Link>

                </div>

                <h3>{title}</h3>
                <p className="article-body">{body}</p>

            </CardContent>
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
                    <Comments article_id={article_id} />
                </CardContent>
            </Collapse>
        </Card>
    );
}
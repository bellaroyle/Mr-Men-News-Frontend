import React from 'react';
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
    // const avatarUrl = getUser(author).then((user) => {
    //     return <Avatar src={user.avatar_url} alt={`${author}'s avatar`} />
    // })
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} id="article-card">
            <CardContent >
                <div className='card-header'>
                    <div className="post-by">
                        <AvatarDisplay author={author} />
                        <p><Link to={`/users/${author}`} style={{ textDecoration: 'none' }} > {author}</Link> <br />{formatDate(created_at)}</p>
                    </div>
                    <Link to={`/topics/${topic}`} style={{ textDecoration: 'none' }}>{capitalise(topic)}</Link>

                </div>
                <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }} className="card-title">
                    <h3>{title}</h3>
                </Link>

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
                    <p>Showing {props.limit ? 'All' : '5'} comments</p>
                    <Comments article_id={article_id} limit={props.limit || '5'} />
                </CardContent>
            </Collapse>
        </Card>
    );
}
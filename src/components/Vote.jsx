import React from 'react';
import IconButton from '@material-ui/core/IconButton';
// import { KeyboardArrowUpIcon, KeyboardArrowDownIcon } from '@material-ui/icons'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

const Vote = (props) => {
    return (
        <div className="votes-container">
            <IconButton aria-label="upVote" id="upVote" onClick={() => { props.handleVote(1) }}>
                <ThumbUpAltIcon />
            </IconButton>
            <p id='vote-number'>{props.votes}</p>
            <IconButton aria-label="downVote" id="downVote" onClick={() => { props.handleVote(-1) }}>
                <ThumbDownAltIcon />
            </IconButton>
        </div>
    );
};

export default Vote;
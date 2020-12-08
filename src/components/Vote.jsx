import React from 'react';
import IconButton from '@material-ui/core/IconButton';
// import { KeyboardArrowUpIcon, KeyboardArrowDownIcon } from '@material-ui/icons'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Vote = (props) => {
    return (
        <div className="votes-container">
            <IconButton aria-label="upVote" onClick={() => { props.handleVote(1) }}>
                <ExpandLessIcon />
            </IconButton>
            <p>{props.votes} Votes</p>
            <IconButton aria-label="downVote" onClick={() => { props.handleVote(-1) }}>
                <ExpandMoreIcon />
            </IconButton>
        </div>
    );
};

export default Vote;
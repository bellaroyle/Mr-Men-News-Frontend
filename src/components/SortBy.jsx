import React from 'react';

const SortBy = (props) => {
    const passOptionBack = (toSortBy) => {
        props.addToQuery(toSortBy)
    }
    return (
        <div>
            {/* <label className='sort'>Sort By: </label> */}
            <select id="sort-by" onChange={(event) => { passOptionBack(event.target.value) }} >
                <option value="" disabled selected>Sort By</option>

                <option value="created_at desc">Most Recent</option>
                <option value="created_at asc">Oldest</option>
                <option value="votes asc">Votes (Low to High)</option>
                <option value="votes desc">Votes (High to Low)</option>
            </select>
        </div>
    );
};

export default SortBy;

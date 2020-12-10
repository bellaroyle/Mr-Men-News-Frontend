// import React from 'react';

// const SortBy = (props) => {
//     const passOptionBack = (toSortBy) => {
//         props.addToQuery(toSortBy)
//     }
//     return (
//         <div>
//             <select id="sort-by" onChange={(event) => { passOptionBack(event.target.value) }} >
//                 <option value="" disabled selected>Sort By</option>
//                 <option value="created_at desc">Most Recent</option>
//                 <option value="created_at asc">Oldest</option>
//                 <option value="votes asc">Votes (Low to High)</option>
//                 <option value="votes desc">Votes (High to Low)</option>
//             </select>
//         </div>
//     );
// };

// export default SortBy;


import React, { Component } from 'react';
import { getTopics } from '../api'
import ErrorPage from './ErrorPage'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class SortBy extends Component {
    state = {
        sorts: ['created_at desc', 'created_at asc', 'votes asc', 'votes desc'],
        currentSort: '',
        value: 0,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        const newSort = this.state.currentSort !== prevState.currentSort
        if (newSort) {
            this.props.changeSort(this.state.currentSort)
        }
    }

    handleChange = (event, newValue) => {
        const { sorts } = this.state
        const sort = event.target.innerText.toLowerCase()
        let currentSort = ''
        if (sort === 'newest') {
            currentSort = sorts[0]
        }
        else if (sort === 'oldest') {
            currentSort = sorts[1]
        }
        else if (sort === 'votes ⬇') {
            currentSort = sorts[2]
        }
        else {
            currentSort = sorts[3]
        }
        this.setState({ value: newValue, currentSort })
    };
    render() {
        const {
            sorts,
            value,
            hasError,
            errorMessage
        } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else return (
            <Paper id="sort-bar" >
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={this.handleChange}
                >

                    <Tab label='Newest' key={sorts[0]} />
                    <Tab label='Oldest' key={sorts[1]} />
                    <Tab label='Votes ⬇' key={sorts[2]} />
                    <Tab label='Votes ⬆' key={sorts[3]} />



                </Tabs>
            </Paper >
        );
    }
}
export default SortBy;
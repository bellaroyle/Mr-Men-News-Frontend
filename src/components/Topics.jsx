import React, { Component } from 'react';
import { Link } from '@reach/router'
import { getTopics } from '../api'
import { capitalise } from '../utils'

class Topics extends Component {
    state = {
        topics: []
    }

    componentDidMount() {
        console.log(this.props)
        getTopics().then(topics => {
            this.setState({ topics })

        })
    }

    render() {
        const { topics } = this.state
        return (
            <nav>
                <Link to='/'><button>All Articles</button></Link>
                {topics.map(topic => {
                    return <Link key={topic.slug} to={`/topics/${topic.slug}`}>
                        <button>{capitalise(topic.slug)}</button>
                    </Link>
                })}
            </nav>
        )
    }
}

export default Topics;
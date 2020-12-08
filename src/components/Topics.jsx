import React, { Component } from 'react';
import { Link } from '@reach/router'
import { getTopics } from '../api'
import { capitalise } from '../utils'
import Button from '@material-ui/core/Button'
import { Tab, Tabs, Paper } from '@material-ui/core'


class Topics extends Component {
    state = {
        topics: []
    }

    componentDidMount() {
        getTopics().then(topics => {
            this.setState({ topics })

        })
    }

    render() {
        const { topics } = this.state
        return (
            <nav>
                {/* want to implement: underline the tab we are currently on- look at material ui docs  */}
                <Paper>
                    <Tabs
                        // value={value}
                        // onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Tab label="All" classes={{ label: 'nav-buttons' }} />
                        </Link>

                        {topics.map(topic => {
                            return (
                                <Link
                                    to={`/topics/${topic.slug}`}
                                    key={topic.slug}
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                    classes={{ label: 'nav-buttons' }}
                                >
                                    <Tab label={topic.slug} classes={{ label: 'nav-buttons' }} />
                                </Link>
                            )
                        })}
                    </Tabs>
                </Paper>
            </nav>
        )
    }
}

export default Topics;
import React, { Component } from 'react';
import { getTopics } from '../api'
import ErrorPage from './ErrorPage'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Topics extends Component {
    // const [value, setValue] = React.useState(2);
    state = {
        topics: [],
        topic: 'all',
        value: 0,
        hasError: false,
        errorMessage: ''
    }
    componentDidMount() {
        getTopics().then(topics => {
            this.setState({ topics })

        })
            .catch(err => {
                const { response: { status, data: { msg } }, } = err
                this.setState({ hasError: true, errorMessage: `${status}! ${msg}` })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const newTopic = this.state.topic !== prevState.topic
        if (newTopic) {
            this.props.changeTopic(this.state.topic)
        }
    }

    handleChange = (event, newValue) => {
        const topic = event.target.innerText.toLowerCase()
        this.setState({ value: newValue, topic })
    };
    render() {
        const {
            topics,
            value,
            hasError,
            errorMessage
        } = this.state
        if (hasError) {
            return <ErrorPage errorMessage={errorMessage} />
        }
        else return (
            <Paper id="topics-bar">
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={this.handleChange}
                >
                    <Tab label="All" key="all" />
                    {topics.map(topic => {
                        return (
                            <Tab label={topic.slug} key={topic.slug} />
                        )
                    })}
                </Tabs>
            </Paper >
        );
    }
}
export default Topics;
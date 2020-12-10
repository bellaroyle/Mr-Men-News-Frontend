import './App.css';
import React, { Component } from 'react';
import { Router } from '@reach/router'
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import UserProfile from './components/UserProfile'
import Article from './components/Article'
import ErrorPage from './components/ErrorPage'
import { UserContext } from './contexts/User'


class App extends Component {
  state = {
    loggedInUser: 'cooljmessy'
  }
  logout = () => {
    this.setState({ loggedInUser: null })
  }
  login = (newUser) => {
    this.setState({ loggedInUser: newUser })
  }
  render() {

    return (
      <UserContext.Provider
        value={{ loggedInUser: this.state.loggedInUser, logout: this.logout, login: this.login }}>
        <div className="App">

          <Header />
          {/* <Topics /> */}
          <Router>
            <ArticlesList path="/" />
            {/* <ArticlesList path="/topics/:topic_slug" /> */}
            <UserProfile path="users/:username" />
            <Article path='articles/:article_id' limit="100" />
            <ErrorPage default errorMessage="Page not found!" />
          </Router>

        </div>
      </UserContext.Provider>
    );
  }
}

export default App;

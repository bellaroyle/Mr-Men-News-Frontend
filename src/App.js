import './App.css';
import { Router } from '@reach/router'
import Header from './components/Header'
import Topics from './components/Topics'
import ArticlesList from './components/ArticlesList'
import UserProfile from './components/UserProfile'
import Article from './components/Article'
import ErrorPage from './components/ErrorPage'


function App() {
  return (
    <div className="App">

      <Header />
      {/* <Topics /> */}
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/topics/:topic_slug" />
        <UserProfile path="users/:username" />
        <Article path='articles/:article_id' limit="100" />
        <ErrorPage default errorMessage="Page not found!" />
      </Router>

    </div>
  );
}

export default App;

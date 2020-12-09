import './App.css';
import { Router } from '@reach/router'
import Header from './components/Header'
import Topics from './components/Topics'
import ArticlesList from './components/ArticlesList'
import UserProfile from './components/UserProfile'
import Article from './components/Article'


function App() {
  return (
    <div className="App">

      <Header />
      <Topics />
      {/* <SortBy /> */}
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/topics/:topic_slug" />
        <UserProfile path="users/:username" />
        <Article path='articles/:article_id' limit="100" />
      </Router>

    </div>
  );
}

export default App;

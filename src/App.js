import './App.css';
import { Router } from '@reach/router'
import Header from './components/Header'
import Topics from './components/Topics'
import ArticlesList from './components/ArticlesList'


function App() {
  return (
    <div className="App">
      <Header />
      <Topics />
      {/* <SortBy /> */}
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/topics/:topic_slug" />
      </Router>

    </div>
  );
}

export default App;

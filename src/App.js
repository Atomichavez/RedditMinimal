import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from './components/nav/Nav'
import { Search } from './components/search/Search'
import { Feed } from './components/feed/Feed'
import { Subs } from './components/subs/Subs'
import { Popular } from './components/popular/Popular'
import styles from './components/styles.module.css'
import { BrowserRouter as Router, Switch, Route, Routes, NavLink, useRouteMatch } from 'react-router-dom'
import { Thread } from './components/thread/Thread';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav/>
        <div className={styles.mainContainer}>
          <Search/>
          <Popular/>
          <Subs/>
          <Routes>
            <Route path=':listing' element={<Feed/>}/>
            <Route path='r/:sub' element={<Feed/>}/>
            <Route path='r/:sub/comments/:subId' element={<Thread/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

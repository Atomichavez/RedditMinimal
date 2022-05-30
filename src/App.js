import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Nav } from './components/nav/Nav'
import { Search } from './components/search/Search'
import { Feed } from './components/feed/Feed'
import { Subs } from './components/subs/Subs'
import styles from './components/styles.module.css'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className={styles.mainContainer}>
        <Search/>
        <Subs/>
        <Feed/>
      </div>
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Nav } from './components/nav/Nav'
import { Search } from './components/search/Search'
import { Feed } from './components/feed/Feed'
import { Subs } from './components/subs/Subs'
import styles from './components/styles.module.css'
import { BrowserRouter as Router, Switch, Route, NavLink, useRouteMatch } from 'react-router-dom'
import { routes } from './app/routes'

function App() {
  return (
    <Router>
      <div className="App">
      <Nav/>
        <div className={styles.mainContainer}>
          <Search/>
          <Subs/>
          <NavLink to= {routes.all()}>ALL</NavLink>
          <NavLink to= {routes.hot()}>HOT</NavLink>
          <NavLink to= {routes.rising()}>RISING</NavLink>
          <Feed/>
        </div>
        {/* <header className="App-header">
          <Counter />
        </header> */}
      </div>
    </Router>
  );
}

export default App;

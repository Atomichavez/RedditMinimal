import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../app/routes'
import styles from '../styles.module.css'

export const Popular = () => {
  return(
    <div className={styles.popular}>
      <NavLink to= {routes.hot()}>HOT </NavLink>
      <NavLink to= {routes.rising()}>RISING </NavLink>
      <NavLink to= {routes.top()}>TOP </NavLink>
      <NavLink to= {routes.new()}>NEW </NavLink>
    </div>
  )
}
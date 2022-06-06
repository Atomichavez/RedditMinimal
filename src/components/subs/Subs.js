import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { useUpdateEffect } from '../../utils/functions'
import { selectSubsResponse, SubThunk } from './subsSlice'
import { NavLink } from 'react-router-dom'

export const Subs = () => {
  const dispatch = useDispatch()
  const subList = useSelector(selectSubsResponse)
  const lastSub = subList[subList.length -1]

  useEffect(() => {
    dispatch(SubThunk())
  }, [])
  
  const handleMoreSubs = () => {
    console.log(lastSub.name)
    dispatch(SubThunk(lastSub.name))
  }

  return(
    <div className={styles.subs}>
      {subList.map(sub => 
        <NavLink 
          to={`/r/${sub.display_name}`} 
          className={styles.subTitle}>
            {sub.display_name}
        </NavLink>)}
      <button onClick={handleMoreSubs}>More</button>
    </div>
  )
}
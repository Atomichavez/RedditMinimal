import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { useUpdateEffect } from '../../utils/functions'
import { selectSubsResponse, SubThunk } from './subsSlice'
import { NavLink } from 'react-router-dom'
import { isLoadingSubs, failedToLoadSubs } from './subsSlice'

export const Subs = () => {
  const dispatch = useDispatch()
  const subList = useSelector(selectSubsResponse)
  const isLoading = useSelector(isLoadingSubs)
  const failedToLoad = useSelector(failedToLoadSubs)
  const lastSub = subList[subList.length -1]

  useEffect(() => {
    dispatch(SubThunk())
  }, [])
  
  const handleMoreSubs = () => {
    dispatch(SubThunk(lastSub.name))
  }

  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>

  return(
    <div className={styles.subs}>
      {subList.map(sub => 
        <NavLink 
          to={`/r/${sub.display_name}`} 
          className={styles.subTitle}
          key={sub.id}>
            {sub.display_name}
        </NavLink>)}
      <button onClick={handleMoreSubs}>More</button>
    </div>
  )
}
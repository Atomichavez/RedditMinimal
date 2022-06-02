import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
// eslint-disable-next-line
import { SearchThunk, selectFeedResponse, failedToLoadSearch, isLoadingSearch } from './feedSlice'
import { useLocation } from 'react-router-dom'
import { Thread } from '../thread/Thread'
import { homeThunk } from './feedSlice'

export const Feed = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(searchSelector)
  const feedResponse = useSelector(selectFeedResponse)
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    dispatch(SearchThunk(searchTerm)) 
  }, [searchTerm, dispatch])

  useEffect(() => {
    setCurrentPath(location.pathname)
    dispatch(homeThunk(currentPath+'.json'))
  }, [location, dispatch, currentPath])

  //Estos ifs no estan funcionando
  if(isLoadingSearch===true) return <div>Loading...</div>
  if(failedToLoadSearch===true) return <div>Error loading feed</div>
  if(!feedResponse) return null

  return(
    <div className={styles.feed}>
      {feedResponse.map(({id}) => {
        return(
          <div>
            <Thread key={id} id={id}/>
          </div>
        )
      })}
    </div>
  )
}
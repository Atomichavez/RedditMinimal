import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
// eslint-disable-next-line
import { SearchThunk, selectResponse, failedToLoadSearch, isLoadingSearch } from './feedSlice'

export const Feed = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(searchSelector)
  const feedResponse = useSelector(selectResponse)
  
  useEffect(() => {
    console.log(SearchThunk(searchTerm))
    dispatch(SearchThunk(searchTerm)) 
  }, [searchTerm])

  let feed = ''
  if(isLoadingSearch===true) {
    feed = 'Loading'
  } else if(failedToLoadSearch===true) {
    feed = 'Error Loading'
  } else if (feedResponse) {
    feed = feedResponse
  } else {
    feed = 'nothing to show'
  }
  
  return(
    <div className={styles.feed}>
      <p>{feed}</p>
    </div>
  )
}
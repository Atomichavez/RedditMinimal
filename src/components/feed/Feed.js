import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
import { SearchThunk, selectFeedResponse, failedToLoadFeed, isLoadingFeed } from './feedSlice'
import { useLocation, Link } from 'react-router-dom'
import { FeedThread } from './feedThread'
import { FeedThunk } from './feedSlice'
import { useUpdateEffect } from '../../utils/functions'

export const Feed = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(searchSelector)
  const feedResponse = useSelector(selectFeedResponse)
  const isLoading = useSelector(isLoadingFeed)
  const failedToLoad = useSelector(failedToLoadFeed)
  const location = useLocation()

  useUpdateEffect(() => {
    dispatch(SearchThunk(searchTerm))
  }, searchTerm)

  useEffect(() => {
    dispatch(FeedThunk(location.pathname+'.json'))
  }, [location])

  
  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>
  
  if(feedResponse) return(
    <div className={styles.feed}>
      {feedResponse.map(({id}) => {
        return(
          <Link to={`/thread=${id}`} key={id}>
            <FeedThread key={id} id={id}/>
          </Link>
        )
      })}
    </div>
  )
}
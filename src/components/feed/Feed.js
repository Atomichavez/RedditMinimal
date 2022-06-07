import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
// eslint-disable-next-line
import { SearchThunk, selectFeedResponse, failedToLoadFeed, isLoadingFeed } from './feedSlice'
import { useLocation } from 'react-router-dom'
import { Thread } from '../thread/Thread'
import { homeThunk } from './feedSlice'
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

  useUpdateEffect(() => {
    dispatch(homeThunk(location.pathname+'.json'))
  }, location)

  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>

  return(
    <div className={styles.feed}>
      {feedResponse.map(({id}) => {
        return(
          <div key={id}>
            <Thread id={id}/>
          </div>
        )
      })}
    </div>
  )
}
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
import { SearchThunk, selectFeedResponse, failedToLoadFeed, isLoadingFeed } from './feedSlice'
import { useLocation, Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/hot')
  }, [])

  useUpdateEffect(() => {
    dispatch(SearchThunk(searchTerm))
  }, searchTerm)

  useUpdateEffect(() => {
    dispatch(homeThunk(location.pathname+'.json'))
  }, location)

  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>
  console.log(feedResponse)
  return(
    <div className={styles.feed}>
      {feedResponse.map(({id}) => {
        return(
          <Link to={`/thread=${id}`} key={id}>
            <Thread key={id} id={id}/>
          </Link>
        )
      })}
    </div>
  )
}
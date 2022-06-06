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
  const location = useLocation()

  useUpdateEffect(() => {
    dispatch(SearchThunk(searchTerm))
  }, searchTerm)

  useUpdateEffect(() => {
    dispatch(homeThunk(location.pathname+'.json'))
  }, location)

  //Estos ifs no estan funcionando
  if(isLoadingFeed===true) return <div>Loading...</div>
  if(failedToLoadFeed===true) return <div>Error loading feed</div>
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
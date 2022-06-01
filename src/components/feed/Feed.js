import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles.module.css'
import { searchSelector } from '../search/searchSlice'
// eslint-disable-next-line
import { SearchThunk, selectResponse, failedToLoadSearch, isLoadingSearch } from './feedSlice'
import { Thread } from '../thread/Thread'

export const Feed = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(searchSelector)
  const feedResponse = useSelector(selectResponse)
  
  useEffect(() => {
    dispatch(SearchThunk(searchTerm)) 
  }, [searchTerm, dispatch])

  //Estos ifs no estan funcionando
  if(isLoadingSearch===true) return <div>Loading...</div>
  if(failedToLoadSearch===true) return <div>Error loading feed</div>
  if(!feedResponse) return null
  console.log(feedResponse)
  return(
    <div className={styles.feed}>
      {feedResponse.map(thread => {
        console.log(thread)
        return(
          <div>
            <Thread id={thread.id}/>
          </div>
        )
      })}
    </div>
  )
}
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { threadThunk } from "./threadSlice"
import { useLocation } from "react-router-dom"
import { isLoadingThread, failedToLoadThread, selectThreadResponse } from "./threadSlice"
import styles from '../styles.module.css'

export const Thread = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const threadResponse = useSelector(selectThreadResponse)
  const isLoading = useSelector(isLoadingThread)
  const failedToLoad = useSelector(failedToLoadThread)

  useEffect(() => {
    dispatch(threadThunk(location.pathname+`.json`))
  }, [location])
  
  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>
  
  if(threadResponse) return(
    <div className={styles.feed}>
      <p>This is a thread</p>
    </div>
  )
}
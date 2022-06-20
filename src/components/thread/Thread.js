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
  
  let comments = []
  let indent = 0
  
  const loopComments = (commentArr) => {
    commentArr.map(comment => {
      if(comment.data.replies) {
        comments.push({comment: comment.data.body, indent: indent, id: comment.data.id})
        indent += 1
        loopComments(comment.data.replies.data.children)
      } else {
        comments.push({comment: comment.data.body, indent: indent, id: comment.data.id})
        indent = 0
      }
    })
    return comments
  }

  if(isLoading===true) return <div>Loading...</div>
  if(failedToLoad===true) return <div>Error loading feed</div>

  if(threadResponse) {
    return(
    <div className={styles.feed}>
      <h1>{threadResponse[0].data.children[0].data.title}</h1>
      {loopComments(threadResponse[1].data.children).map(obj=>{
        return(
          <div 
            key={obj.id} 
            className={styles.threadComment} 
            style={{'paddingLeft':(obj.indent*40)+'px'}}>
            <p>{obj.comment}</p>
          </div>
        )
      })}
    </div>
  )}
}
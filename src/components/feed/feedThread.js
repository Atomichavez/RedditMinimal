import { useSelector } from 'react-redux'
import { selectFeedResponse } from './feedSlice'
import styles from '../styles.module.css'

export const FeedThread = ({id}) => {
  const threads = useSelector(selectFeedResponse)
  const thread = threads.find(obj => obj.id === id)
  
  return(
    <div className={styles.feedThread}>
      <p>{thread.title}</p>
      <p>{thread.author} {thread.subreddit} {thread.num_comments}</p>
    </div>
  )
}


// let obj = {
//   postId: {
//     subreddit: 'formula1',
//     subreddit_id: 't5_2qimj',
//     author: 'AceBombkick',
//     thumbnail: 'https://b.thumbs.redditmedia.com/pDFngUn2Jk6uec1bsChq9dOD6Or1FsDYBRKMjBFOazE.jpg',
//     title: 'Charles Leclerc has crashed Niki Laudas Ferrari in the Monaco Historic Grand Prix',
//     created: 1652614561,
//     score: 42654,
//     num_comments: 1468
//   }
// }
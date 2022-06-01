import { useSelector } from 'react-redux'
import { selectResponse } from '../feed/feedSlice'

export const Thread = (id) => {
  const threads = useSelector(selectResponse)
  const thread = threads.filter(obj => obj.id === Object.values(id)[0])
  console.log(id)
  return(
    <div>
      <p>{thread[0].title}</p>
    </div>
  )
}


let obj = {
  postId: {
    subreddit: 'formula1',
    subreddit_id: 't5_2qimj',
    author: 'AceBombkick',
    thumbnail: 'https://b.thumbs.redditmedia.com/pDFngUn2Jk6uec1bsChq9dOD6Or1FsDYBRKMjBFOazE.jpg',
    title: 'Charles Leclerc has crashed Niki Laudas Ferrari in the Monaco Historic Grand Prix',
    created: 1652614561,
    score: 42654,
    num_comments: 1468
  }
}
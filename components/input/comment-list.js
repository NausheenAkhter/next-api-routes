import useSWR from 'swr'
import classes from './comment-list.module.css';

function CommentList() {
  const {data = {}, error}=useSWR('/api/comments',  (url) => fetch(url).then(res => res.json()))
  const {comments = []} = data
  if(error) {
    return <div>...error</div>
  }

  return (
    <ul className={classes.comments}>
      {comments.map((comment, index) => <div key={`comment-${index}`}><li>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.email}</address>
        </div>
      </li>
      </div>)}

    </ul>
  );
}

export default CommentList;

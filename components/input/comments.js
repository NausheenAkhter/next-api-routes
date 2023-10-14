import { useState } from 'react';
import {mutate} from 'swr'
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
  try {
    const resp = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
      'Content-Type': 'application/json'
    })
    mutate('/api/comments')
    const data = resp.json()
    console.log(data);
  } catch (error) {
    console.log(error);
  }
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;

'use client';
import styles from '../page.module.css';
import { useEffect, useState } from 'react';

function GetCommentsComponent({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        if (data.comments) {
          setComments(data.comments);
        }
      });
  }, [post]);
  return (
    <div className={styles.showCommentsContainer}>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.commentText}>
          🗨️ {comment.text}
        </li>
      ))}
    </div>
  );
}

export default GetCommentsComponent;

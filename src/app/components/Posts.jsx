'use client';
import { useState } from 'react';
import styles from '../page.module.css';
import Comments from './GetComments.jsx';
import { useRouter } from 'next/navigation.js';

/// LIKE function
export default function Posts({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const likePost = async () => {
    const response = await fetch(`/api/posts/${post.id}/likes`, {
      method: 'POST',
    });
    const info = await response.json()
    console.log(info)

    if (!response.ok) {
      throw new Error('Error liking post');
    }

    router.refresh();

    setLikes(likes + 1);
  };

  // DELETE function
  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting post');
    }

    router.refresh();
  };

  // Post a comment function

  const postComment = async () => {
    if (comment.trim() === '') {
      setErrorMessage('Please enter a comment before posting.');
      return;
    }

    const response = await fetch(`/api/posts/${post.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: comment }),
    });
console.log(response)
    if (!response.ok) {
      throw new Error('Error posting comment');
    }
    
    router.refresh();
    setComment('');
    setShowCommentBox(false);
    setErrorMessage('');
  };

  // Edit post function
  const editPost = async () => {
    if (editedText === post.text) {
      setErrorMessage('No changes were made to the post.');
      return;
    }

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: editedText }),
    });

    if (!response.ok) {
      throw new Error('Error editing post');
    }
    
    router.refresh();
    setIsEditing(false);
    setErrorMessage('');
  };

  return (
    <div key={post.id}>
      <div className={styles.postsContainer}>
        {isEditing && errorMessage && (
          <p className={styles.errorText}>⛔ {errorMessage}</p>
        )}
        {isEditing ? (
          <div className={styles.editContainer}>
            <textarea
              className={styles.editText}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onClick={() => setErrorMessage('')}
            />
            <div className={styles.btnContainer}>
              <button
                className={styles.editBtn}
                onClick={() => editPost(post.id)}
              >
                Edit Post
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{post.text}</p>
        )}
        <div className={styles.emojiContainer}>
          <p className={styles.emoji} onClick={() => likePost(post.id)}>
            {' '}
            {likes} 👍
          </p>
          <p
            className={styles.emoji}
            onClick={() => {
              setShowCommentBox(!showCommentBox);
              setErrorMessage('');
            }}
          >
            💬
          </p>
          <p className={styles.emoji} onClick={() => deletePost(post.id)}>
            🗑️
          </p>
          <p
            className={styles.emoji}
            onClick={() => {
              setIsEditing(true);
              setEditedText(post.text);
              setErrorMessage('');
            }}
          >
            📝
          </p>
        </div>
        {showCommentBox && (
          <div className={styles.commentContainer}>
            <textarea
              className={styles.textComment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onClick={() => setErrorMessage('')}
            />
            <div className={styles.commentBtnContainer}>
              <button
                className={styles.commentBtn}
                onClick={() => postComment(post.id)}
              >
                Comment
              </button>
              <button
                className={styles.cancelCommentBtn}
                onClick={() => setShowCommentBox(false)}
              >
                Cancel
              </button>
            </div>
            {errorMessage && (
              <p className={styles.errorText}>⛔ {errorMessage}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <Comments post={post} />
      </div>
    </div>
  );
}

"use client";
import styles from '../page.module.css';
import { useEffect, useState } from 'react';

function GetCommentsComponent({post}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/comments?id=${post.id}`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [post]);

    return (
        <div className={styles.showCommentsContainer}>
            {comments.map((comment) => (
                <li key={comment.id} className={styles.commentText}>🗨️ {comment.text}</li>
            ))}
        </div>
    );
}

export default GetCommentsComponent;


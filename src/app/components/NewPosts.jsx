'use client';
import { useState } from 'react';
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';

export default function NewPosts() {
       const [text, setText] = useState('');
       const [error, setError] = useState('');
       const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (text === '') {
      setError('You must provide text in field.');
      return;
    }

    const res = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      setError(info.error);
    } else {
      setText('');
      router.refresh();
    }
  }




  return (
       <div>
       <form onSubmit={handleSubmit} className={styles.newPostsContainer}>
         <textarea
           value={text}
           onChange={(e) => {
             setText(e.target.value);
             setError('');
           }}
           placeholder="I want the world to know.."
           className={styles.textInput}
         />
         <button className={styles.submitBtn} type='submit'>
           Submit Post
         </button>
       </form>
       {error && <p className={styles.errorMessage}>⛔ {error}</p>}
     </div>
  )
}

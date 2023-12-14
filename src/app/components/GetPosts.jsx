import { prisma } from '../lib/prisma.js';
import Posts from './Posts.jsx';

export default async function GetPosts() {
 
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export async function POST(request, response) {
       try {
         const { postId } = await request.json();
     
         if (!postId) {
           return NextResponse.json({
             success: false,
             error: "You must provide a post ID.",
           });
         }
     
         const post = await prisma.post.findFirst({
           where: { id: postId },
         });
     
         if (!post) {
           return NextResponse.json({
             success: false,
             message: "No post with that ID found.",
           });
         }
     
         const updatedPost = await prisma.post.update({
           where: { id: postId },
           data: { likes: { increment: 1 } },
         });
     
         return NextResponse.json({ success: true, post: updatedPost });
       } catch (error) {
         return NextResponse.json({ success: false, error: error.message });
       }
     }
     
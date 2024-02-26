import React, { useEffect, useState } from 'react'
import './Feed.css'
import image from '../public/rahdi.jpg'
import second from '../public/vite.svg'
import StoryReel from './StoryReel';
import CreatePost from './CreatePost';
import Post from './Post';
import supabase from '../supabase_config';

function Feed() {
  const [posts, setPosts] = useState(null)
  useEffect(()=>{   
    async function getPosts(){
      const {data, error} = await supabase
      .from('Posts')
      .select('*')
      .order('id', { ascending: false })
      if (data && error == null){
        setPosts(data)
      }
    }
    getPosts()
    const Posts = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'Posts' },
      (payload) => {
        console.log('Change received!', payload)
        getPosts()
      }
    )
    .subscribe()
  }, [])
  return (
    <div className='feed'>
        <StoryReel/>
        <CreatePost/>
        {posts && posts.map(post=>(
        <Post key={post.id} username={post?.username} image={post?.image} profilePic={post?.user_photo} caption={post.caption} />
        ))}
    </div>
  )
}

export default Feed;
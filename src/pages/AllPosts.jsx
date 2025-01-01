import React,{useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components'

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{ appwriteService.getPosts([]).then((posts)=>{
    if(posts)
      setPosts(posts.documents)
  }) },[])
 
  return posts.length > 0 ? (
    <div className='w-full py-8 flex-grow '>
      <Container>
        <div className='flex flex-wrap h-96'>
        {/* <h1>All post</h1> */}
        {console.log(posts)}
          {posts.map((post)=>(
          <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post}/>
          </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className='w-full py-8  flex justify-center items-center flex-grow'>
      <Container>
        <h1 className='font-mono text-4xl'>No post found :smile</h1>
      </Container> </div>
      )
}

export default AllPosts
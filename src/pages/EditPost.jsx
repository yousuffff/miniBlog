import React,{useState, useEffect} from 'react'
import {Container , PostForm} from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams();
  const navigate = useNavigate()
  
  // console.log(slug)
  useEffect(()=>{
    if(slug){
      appwriteService.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }
    })
    }
    else{
      navigate('/')
    }

  },[slug, navigate])
  
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : (
    <div className='py-8'>
      <Container>
        <h1>Post not found</h1>
      </Container>
    </div>
  )
}

export default EditPost
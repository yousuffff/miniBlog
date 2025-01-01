import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
// console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center flex-grow">
        <Container>
          <div className="flex flex-wrap  place-items-center my-16 ">
            <div className="p-2 w-full h-full ">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
                {/* {console.log(`hello homie`)} */}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8 flex-grow">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map((post)=>(
            <div className="p-2 w-1/4" key={post.$id}>
            {/* {console.log(post)} */}
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home;

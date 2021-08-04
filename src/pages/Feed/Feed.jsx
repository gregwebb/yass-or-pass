import React, { useState, useEffect } from "react";
import Navigation from '../../components/Navigation/Navigation';
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import "./Feed.css";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as userService from "../../utils/userService";
import Vibe from '../../components/Vibe/Vibe';

export default function Feed({ user, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

async function handleAddPost(post) {
    console.log(post);
    const data = await postsAPI.create(post);
    console.log(data.post, " This is newPup", data, " data var");
    setPosts((posts) => [data.post, ...posts]);
    }

async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      setPosts([...data.posts]);
    } catch (err) {
      console.log(err, " this is the error");
    }
  }

  async function getUsers() {
    try {
      const data = await postsAPI.getAll();
      setUsers([...data.users]);
    } catch (err) {
      console.log(err, " this is the error");
    }
  }

useEffect(() => {
    getPosts();
    getUsers();
  }, []);


    return (
        <div className="feed-container">
             <Navigation user={user.emoji} handleLogout={handleLogout} />
             <div className="vibe-container">
                 <Vibe posts={posts} />
            </div>
             <div className="post-container">
                 <AddPostForm handleAddPost={handleAddPost}/> 
                 <PostFeed posts={posts}/>
            </div>

         </div>
    )
}




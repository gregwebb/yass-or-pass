import React, { useState, useEffect } from "react";
import Navigation from '../../components/Navigation/Navigation';
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import "./Feed.css";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as userService from "../../utils/userService";
import Vibe from '../../components/Vibe/Vibe';
import Footer from '../../components/Footer/Footer';

export default function Feed({ user, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    function handleAddPost(post){
        const data = postsAPI.create(post);
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
      const data = await userService.getAll();
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
        <>
        <div className="feed-container">
             <Navigation user={user.emoji} handleLogout={handleLogout} />
             <div className="vibe-container">
                 <Vibe users={users} />
            </div>
             <div className="post-container">
                 <AddPostForm handleAddPost={handleAddPost} user={user}/> 
                 <PostFeed posts={posts}/>
            </div>
         </div>

                     </>
    )
}




import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import "./Feed.css";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as userService from "../../utils/userService";
import Vibe from "../../components/Vibe/Vibe";
import * as likesAPI from "../../utils/likesApi";
import * as dislikesAPI from "../../utils/dislikesApi";

export default function Feed({ user, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

  async function deletePost(post) {
    try {
      await postsAPI.deletePost(post);
      getPosts();
      getMatches();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddPost(post) {
    const data = await postsAPI.create(post);
    getMatches();
    getPosts();
  }

  async function getMatches() {
    try {
      const data = await likesAPI.getMatches();
      setMatches([...data.matches]);
    } catch (err) {
      console.log(err, " this is the error");
    }
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

  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      console.log(data, " this is from addLike");
      getPosts();
      getMatches();
    } catch (err) {
      console.log(err);
    }
  }

  async function removeLike(likeID) {
    try {
      await likesAPI.removeLike(likeID);
      getPosts();
      getMatches();
    } catch (err) {
      console.log(err);
    }
  }

  async function addDislike(postId) {
    try {
      const data = await dislikesAPI.create(postId);
      console.log(data, " this is from addDislike");
      getPosts();
      getMatches();
    } catch (err) {
      console.log(err);
    }
  }

  async function removeDislike(dislikeID) {
    try {
      await dislikesAPI.removeDislike(dislikeID);
      getPosts();
      getMatches();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
    getUsers();
    getMatches();
  }, []);

  return (
    <div className="feed-container">
      <Navigation user={user} handleLogout={handleLogout} />
      <Vibe users={users} posts={posts} user={user} matches={matches} />
      <div className="post-container">
        <AddPostForm handleAddPost={handleAddPost} user={user} />
        <PostFeed
          posts={posts}
          user={user}
          addLike={addLike}
          removeLike={removeLike}
          addDislike={addDislike}
          removeDislike={removeDislike}
          deletePost={deletePost}
          matches={matches}
        />
      </div>
    </div>
  );
}

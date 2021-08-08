import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "../Feed/Feed.css";
import ProfilePostFeed from "../../components/ProfilePostFeed/ProfilePostFeed";
import * as postsAPI from "../../utils/postApi";
import * as userService from "../../utils/userService";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import * as likesAPI from "../../utils/likesApi";
import * as dislikesAPI from "../../utils/dislikesApi";
import { useParams } from "react-router-dom";

export default function ProfilePage({ user, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const [matchPercent, setMatchPercent] = useState({});
  const { username } = useParams();
  const [error, setError] = useState("");

  async function handleAddPost(post) {
    setLoading(true);
    const data = await postsAPI.create(post);
    console.log(data);
    setPosts((posts) => [data.post, ...posts]);
    setLoading(false);
  }

  async function getMatches() {
    try {
      const data = await likesAPI.getMatches();
      setMatches([...data.matches]);
    } catch (err) {
      console.log(err, " this is the error");
    }
  }

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " data");

      // data is the response from the controller function /api/users/profile
      // go to the controller function and look at what is returned
      // posts and user are the properties on the data object
      setLoading(() => false);
      setPosts(() => [...data.posts]);
      setLikedPosts(() => [...data.likedPosts]);
      setDislikedPosts(() => [...data.dislikedPosts]);
      setProfileUser(() => data.user);
      setMatchPercent(() => data.result);
    } catch (err) {
      console.log(err);
      setError("Profile does not Exist");
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
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async function removeLike(likeID) {
    try {
      const data = await likesAPI.removeLike(likeID);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async function addDislike(postId) {
    try {
      const data = await dislikesAPI.create(postId);
      console.log(data, " this is from addDislike");
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async function removeDislike(dislikeID) {
    try {
      const data = await dislikesAPI.removeDislike(dislikeID);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfile();
    getUsers();
    getMatches();
  }, []);

  return (
    <div className="feed-container">
      <Navigation user={user} handleLogout={handleLogout} />
      <ProfileCard
        profileUser={profileUser}
        posts={posts}
        likedPosts={likedPosts}
        dislikedPosts={dislikedPosts}
        user={user}
        matches={matches}
        matchPercent={matchPercent}
      />
      <div className="post-container">
        <ProfilePostFeed
          posts={posts}
          user={user}
          profileUser={profileUser}
          addLike={addLike}
          removeLike={removeLike}
          addDislike={addDislike}
          removeDislike={removeDislike}
        />
      </div>
    </div>
  );
}

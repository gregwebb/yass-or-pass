import React, { useState } from "react";
import VibeCard from "../VibeCard/VibeCard";
import * as likesAPI from "../../utils/likesApi";

export default function Vibe({
  users, user
}) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const data = await likesAPI.votedPosts();
      setPosts([...data.posts]); 
    } catch (err) {
      console.log(err, " this is the error");
    }
  }

  return (
    <div className = "vibe">
      You Vibe With {user.username}
      <br />
      {users.map((user) => {
        return (
          <VibeCard
            user={user} posts = {posts}

          />
          
        );
      })}
            {users.slice(0,2).map((user) => {
        return (
          <VibeCard
            user={user}

          />
          
        );
      })}
    </div>
  );
}

import React from "react";
import VibeCard from "../VibeCard/VibeCard";

export default function Vibe({
  users, posts
}) {


  return (
    <div className = "vibe">
      You Vibe With
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

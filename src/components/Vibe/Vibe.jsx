import React, { useState} from "react";
import VibeCard from "../VibeCard/VibeCard";
import * as likesAPI from "../../utils/likesApi";

export default function Vibe({
  users, user, matches
}) {
  const [posts, setPosts] = useState([]);



  return (
    <div className = "vibe">
      You Vibe With
      <br />
      {matches.map((match) => {
        return (
          <VibeCard
            user={match} posts = {posts} match = {match}

          />
          
        );
      })}

    </div>
  );
}

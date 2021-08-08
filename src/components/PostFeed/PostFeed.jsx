import React from "react";
import PostCard from "../PostCard/PostCard";

export default function PostFeed({
  posts, user, addLike, removeLike, addDislike, removeDislike
}) {

  return (
    <div className = "posts">

      {posts.map((post) => {
        return (
          <PostCard
            post={post} user={user} addLike={addLike} removeLike={removeLike} addDislike={addDislike} removeDislike={removeDislike}

          />
        );
      })}
    </div>
  );
}
import React from "react";
import PostCard from "../PostCard/PostCard";

export default function PostFeed({
  posts,
  user,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  profileUser,
  deletePost,
}) {
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <PostCard
            post={post}
            key={post._id}
            user={user}
            addLike={addLike}
            removeLike={removeLike}
            addDislike={addDislike}
            removeDislike={removeDislike}
            profileUser={profileUser}
            deletePost={deletePost}
          />
        );
      })}
    </div>
  );
}

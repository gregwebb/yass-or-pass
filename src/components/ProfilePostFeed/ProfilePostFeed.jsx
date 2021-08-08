import React from "react";
import ProfilePostCard from "../ProfilePostCard/ProfilePostCard";

export default function PostFeed({
  posts,
  user,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  profileUser,
}) {
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <ProfilePostCard
            post={post}
            user={user}
            addLike={addLike}
            removeLike={removeLike}
            addDislike={addDislike}
            removeDislike={removeDislike}
            profileUser={profileUser}
          />
        );
      })}
    </div>
  );
}

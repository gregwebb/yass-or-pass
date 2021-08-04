import React from "react";
import { Card, Loader, Grid, Dimmer, Segment, Image } from "semantic-ui-react";
import PostCard from "../PostCard/PostCard";

export default function PostFeed({
  posts,
}) {
  return (
    <div className = "posts">

      {posts.map((post) => {
        return (
          <PostCard
            post={post}

          />
        );
      })}
    </div>
  );
}
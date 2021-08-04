import React from "react";
import { Card, Loader, Grid, Dimmer, Segment, Image } from "semantic-ui-react";
import VibeCard from "../VibeCard/VibeCard";

export default function Vibe({
  posts,
}) {
  return (
    <div className = "vibe">

      {posts.map((post) => {
        return (
          <VibeCard
            post={post}

          />
        );
      })}
    </div>
  );
}

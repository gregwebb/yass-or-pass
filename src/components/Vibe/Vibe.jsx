import React, { useState } from "react";
import VibeCard from "../VibeCard/VibeCard";
import * as likesAPI from "../../utils/likesApi";
import { Item, Label, Card } from "semantic-ui-react";

export default function Vibe({ users, user, matches }) {
  const [posts, setPosts] = useState([]);

  return (
    <div className="vibe">
      {matches.length > 0 && (
        <Card.Group itemsPerRow={matches.length}>
          {matches.map((match) => {
            return <VibeCard user={user} posts={posts} match={match} />;
          })}
        </Card.Group>
      )}
    </div>
  );
}

import React, { useState} from "react";
import VibeCard from "../VibeCard/VibeCard";
import * as likesAPI from "../../utils/likesApi";
import { Item, Label, Card } from "semantic-ui-react";

export default function Vibe({
  users, user, matches
}) {
  const [posts, setPosts] = useState([]);



  return (
    <div className="vibe">
      {matches.length > 3 &&
      <Card.Group itemsPerRow={4}>
      {matches.map((match) => {
        return (
          <VibeCard
            user={match} posts = {posts} match = {match}
          />
        );
      })
    }
    </Card.Group>
}</div>
  );
}

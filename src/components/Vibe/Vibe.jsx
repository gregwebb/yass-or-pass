import React from "react";
import { Card, Loader, Grid, Dimmer, Segment, Image } from "semantic-ui-react";
import VibeCard from "../VibeCard/VibeCard";

export default function Vibe({
  users,
}) {
  return (
    <div className = "vibe">
      You Vibe With
      <br />
      {users.map((user) => {
        return (
          <VibeCard
            user={user}

          />
          
        );
      })}
            {users.map((user) => {
        return (
          <VibeCard
            user={user}

          />
          
        );
      })}
    </div>
  );
}

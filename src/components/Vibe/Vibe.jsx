import React, { useState } from "react";
import VibeCard from "../VibeCard/VibeCard";
import { Card } from "semantic-ui-react";

export default function Vibe({ user, matches }) {
  return (
    <div className="vibe">
      {matches.length > 0 && (
        <Card.Group itemsPerRow={matches.length}>
          {matches.map((match) => {
            return <VibeCard user={user} match={match} />;
          })}
        </Card.Group>
      )}
    </div>
  );
}

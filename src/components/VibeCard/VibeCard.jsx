import React from "react";
import { Card, Icon } from "semantic-ui-react";
import "./VibeCard.css";

function VibeCard({ user, posts, users, match, matches }) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];

  return (
    <Card>
      <Card.Content>
        <Card.Header textAlign="center">
          <div className="emoji-small">{emojis[match[1]]}</div> 
          <div className="name">{match[0]}</div>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="handshake outline" size="large" color="purple" />
          {(match[2] * 100).toFixed(0)}%
        </a>
      </Card.Content>
    </Card>
  );
}

export default VibeCard;

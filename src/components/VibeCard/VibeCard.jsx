import React from "react";
import { Card, Icon } from "semantic-ui-react";
import "./VibeCard.css";

function VibeCard({ match}) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];

  return (
    <Card href={`/${match[0]}`}>
      <Card.Content>
        <Card.Header>
          <div className="match-item">
            <div className="emoji-small">{emojis[match[1]]}</div>
            <div className="name">{match[0]}</div>
          </div>
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

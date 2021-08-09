import React from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import "./RivalCard.css";

function RivalCard({ rival }) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];

  return (
    <Card href={`/${rival[0]}`}>
      <Card.Content>
        <Card.Header>
          <div className="emoji-small">{emojis[rival[1]]}</div>
          <div className="name">{rival[0]}</div>
        </Card.Header>
        <Label as="a" color="red">
          <span className="badge">🙅🏻‍♂️</span>
          <Label.Detail>Rivals</Label.Detail>
        </Label>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="handshake outline" size="large" color="purple" />
          {(rival[2] * 100).toFixed(0)}%
        </a>
      </Card.Content>
    </Card>
  );
}

export default RivalCard;

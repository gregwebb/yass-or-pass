import React from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import "./BestieCard.css";

function BestieCard({ bestie }) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];

  return (
    <Card href={`/${bestie[0]}`}>
      <Card.Content>
        <Card.Header>
            <div className="emoji-small">{emojis[bestie[1]]}</div>
            <div className="name">{bestie[0]}</div>
        </Card.Header>
                <Label as="a" color="pink">
                    <span className="badge">👯</span>
                    <Label.Detail>Besties</Label.Detail>
                  </Label>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="handshake outline" size="large" color="purple" />
          {(bestie[2] * 100).toFixed(0)}%
        </a>

      </Card.Content>
    </Card>
  );
}

export default BestieCard;
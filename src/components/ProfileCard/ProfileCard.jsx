import React from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import "./ProfileCard.css";

function ProfileCard({
  likedPosts,
  dislikedPosts,
  profileUser,
  posts,
  matchPercent,
}) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];

  return (
    <div className="profile-card">
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <div className="user-emoji">{emojis[profileUser.emoji]}</div>
            <div className="profile-name">{profileUser.username}</div>
          </Card.Header>
          <Card.Meta textAlign={"center"}>
            {profileUser.username} has voted on {posts.length} topics. They have
            voted 'yass' {likedPosts.length} times and 'pass'{" "}
            {dislikedPosts.length} times.
          </Card.Meta>
          <Card.Description textAlign={"center"}>
            <div className="badge-container">
              <div className="badge">
                {matchPercent[0] >= 80 && (
                  <Label as="a" color="pink">
                    <span className="badge">👯</span>
                    <Label.Detail>Besties</Label.Detail>
                  </Label>
                )}
              </div>
              <div className="badge">
                {likedPosts.length > dislikedPosts.length && (
                  <Label as="a" color="yellow">
                    <span className="badge">🙌🏾</span>
                    <Label.Detail>Vibes</Label.Detail>
                  </Label>
                )}
              </div>
              <div className="badge">
                {likedPosts.length < dislikedPosts.length && (
                  <Label as="a" color="silver">
                    <span className="badge">🚶‍♂️</span>
                    <Label.Detail>Hatin'</Label.Detail>
                  </Label>
                )}
              </div>
              <div className="badge">
                {matchPercent[0] <= 20 && (
                  <Label as="a" color="red">
                    <span className="badge">🙅🏻‍♂️</span>
                    <Label.Detail>Rivals</Label.Detail>
                  </Label>
                )}
              </div>
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"center"}>
          <a>
            <Icon name="handshake outline" size="large" color="purple" />
          </a>
          You and {profileUser.username} agree {matchPercent[0]}% of the time.
        </Card.Content>
      </Card>
    </div>
  );
}

export default ProfileCard;

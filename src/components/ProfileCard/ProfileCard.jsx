import React from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import "./ProfileCard.css";
import BestieCard from "../BestieCard/BestieCard";
import RivalCard from "../RivalCard/RivalCard";

function ProfileCard({
  likedPosts,
  dislikedPosts,
  profileUser,
  posts,
  matchPercent,
  user,
  matches,
  besties,
  rivals,
}) {
  const emojis = ["👻", "👽", "🧑", "👩", "👨", "🧓", "👵", "👴"];
  const isUser = profileUser._id === user._id ? true : false;
  const zero = matchPercent[0]==="NaN" ? true : false;

  return (
    <div className="profile-card">
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <div className="user-emoji">{emojis[profileUser.emoji]}</div>
            <div className="profile-name">{profileUser.username}</div>
          </Card.Header>
          <div>
            {" "}
            {isUser && (
              <Card.Meta textAlign={"center"}>
                You have voted on {posts.length} topics. You have voted 'yass'{" "}
                {likedPosts.length} times and 'pass' {dislikedPosts.length}{" "}
                times.
              </Card.Meta>
            )}
          </div>
          <div>
            {" "}
            {!isUser && (
              <Card.Meta textAlign={"center"}>
                {profileUser.username} has voted on {posts.length} topics. They
                have voted 'yass' {likedPosts.length} times and 'pass'{" "}
                {dislikedPosts.length} times.
              </Card.Meta>
            )}
          </div>
          <div>
            {!isUser && (
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
            )}
          </div>
        </Card.Content>

        <Card.Content extra textAlign={"center"}>
          <div>
            {!isUser && (
              <span>
                <Icon name="handshake outline" size="large" color="purple" />
                You and {profileUser.username} agree {!zero ? matchPercent[0] : 0}% of the
                time.
              </span>
            )}
          </div>
        </Card.Content>

        <div className="besties">
          {isUser && (
            <Card.Content extra textAlign={"center"}>
              <Card.Group itemsPerRow={2}>
                {besties.map((bestie) => {
                  return <BestieCard bestie={bestie} />;
                })}
              </Card.Group>

              <Card.Group itemsPerRow={2}>
                {rivals.map((rival) => {
                  return <RivalCard rival={rival} />;
                })}
              </Card.Group>
            </Card.Content>
          )}{" "}
        </div>
      </Card>
    </div>
  );
}

export default ProfileCard;

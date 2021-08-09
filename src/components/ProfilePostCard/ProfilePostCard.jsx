import React from "react";
import { Progress, Card, Icon, Button } from "semantic-ui-react";
import "./ProfilePostCard.css";

function ProfilePostCard({
  post,
  addLike,
  removeLike,
  user,
  addDislike,
  removeDislike,
  profileUser,
}) {
  const liked = post.likes.findIndex((like) => like.username === user.username);
  const disliked = post.dislikes.findIndex(
    (dislike) => dislike.username === user.username
  );
  const profileLiked = post.likes.findIndex(
    (like) => like.username === profileUser.username
  );
  const profileDisliked = post.dislikes.findIndex(
    (dislike) => dislike.username === profileUser.username
  );
  const bothLiked = liked > -1 && profileLiked > -1 ? true : false;
  const bothDisliked = disliked > -1 && profileDisliked > -1 ? true : false;
  const disagree =
    (disliked > -1 && profileLiked > -1) || (liked > -1 && profileDisliked > -1)
      ? true
      : false;
  const noVote = disliked < 0 && liked < 0 ? true : false;
  const clickHandler =
    liked > -1
      ? () => removeLike(post.likes[liked]._id)
      : () => addLike(post._id);
  const dislikeClickHandler =
    disliked > -1
      ? () => removeDislike(post.dislikes[disliked]._id)
      : () => addDislike(post._id);
  const resetClickHandler =
    liked > -1
      ? () => removeLike(post.likes[liked]._id)
      : disliked > -1
      ? () => removeDislike(post.dislikes[disliked]._id)
      : null;

  const isUser = profileUser._id === user._id ? true : false;
  const likeIcon = liked > -1 ? "thumbs up" : "thumbs up outline";
  const dislikeIcon = disliked > -1 ? "thumbs down" : "thumbs down outline";
  const profileLikeIcon = profileLiked > -1 ? "thumbs up" : "thumbs down";
  const likeInfo = liked > -1 ? true : disliked > -1 ? true : null;
  const likeCount = post.likes.length;
  const dislikeCount = post.dislikes.length;
  const votes = likeCount + dislikeCount;
  const likePercent = ((likeCount / votes) * 100).toFixed(1);
  const dislikePercent = ((dislikeCount / votes) * 100).toFixed(1);
  const barColor =
    likePercent > -1 && likePercent <= 33
      ? "red"
      : likePercent > 33 && likePercent <= 66
      ? "yellow"
      : likePercent > 66
      ? "green"
      : "black";

  return (
    <Card fluid key={post._id}>
      <Card.Content>
        <Card.Description>{post.content}</Card.Description>
        <Card.Description textAlign={"right"}>
          <div>
            {bothLiked && (
              <Button positive>
                <div>{!isUser && <span>You both say yassss! 🙌🏾</span>}</div>
                <div>{isUser && <span>You say yassss! 🙌🏾</span>}</div>
              </Button>
            )}
          </div>
        </Card.Description>
        <Card.Description textAlign={"right"}>
          <div>
            {bothDisliked && (
              <Button negative>
                <div>{!isUser && <span>You both say passs! 🙅‍♀️</span>}</div>
                <div>{isUser && <span>You say passs! 🙅‍♀️</span>}</div>
              </Button>
            )}
          </div>
        </Card.Description>
        <Card.Description textAlign={"right"}>
          <div>
            {disagree && (
              <Button color="blue">You disagree on this... 🤷‍♀️</Button>
            )}
          </div>
        </Card.Description>
        <Card.Description textAlign={"right"}>
          <div>
            {noVote && (
              <Button color="yellow">You haven't voted yet! 🤔</Button>
            )}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {likeInfo ? (
          <true>
            <div className="vote">
              <Progress percent={likePercent} color={barColor} size="tiny" />
              <Icon name={likeIcon} size="small" color="green" />
              {likePercent}% &nbsp;
              <Icon name={dislikeIcon} size="small" color="red" />
              {dislikePercent}% &nbsp;
              <Icon
                name="undo"
                size="small"
                color="blue"
                onClick={resetClickHandler}
              />
              <div className="vote-count">
                {profileUser.username}'s vote :
                <Icon name={profileLikeIcon} size="large" color="purple" />
              </div>
            </div>
          </true>
        ) : (
          <false>
            <Icon
              name={likeIcon}
              size="large"
              color="green"
              onClick={clickHandler}
            />
            <Icon
              name={dislikeIcon}
              size="large"
              color="red"
              onClick={dislikeClickHandler}
            />
          </false>
        )}
      </Card.Content>
    </Card>
  );
}

export default ProfilePostCard;

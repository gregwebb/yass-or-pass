import React from "react";
import { Progress, Card, Icon, Button } from "semantic-ui-react";

function PostCard({
  post,
  addLike,
  removeLike,
  user,
  addDislike,
  removeDislike,
  deletePost,
}) {
  const liked = post.likes.findIndex((like) => like.username === user.username);
  const disliked = post.dislikes.findIndex(
    (dislike) => dislike.username === user.username
  );
  const isOP = post.user._id === user._id ? true : false;
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
  const deleteHandler = isOP ? () => deletePost(post._id) : () => null;

  const likeIcon = liked > -1 ? "thumbs up" : "thumbs up outline";
  const dislikeIcon = disliked > -1 ? "thumbs down" : "thumbs down outline";
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
            {!isOP && (
              <Button href={`/${post.user.username}`} color="blue">
                asked by {post.user.username}
              </Button>
            )}{" "}
          </div>
        </Card.Description>
        <Card.Description textAlign={"right"}>
          <div>
            {isOP && (
              <Button onClick={deleteHandler} negative>
                delete question
              </Button>
            )}
          </div>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        {likeInfo ? (
          <div>
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
              <div className="vote-count">({votes} users have voted)</div>
            </div>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;

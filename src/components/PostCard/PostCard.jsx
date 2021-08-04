import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

function PostCard({ post }) {
 

    return (
    <Card fluid key={post._id}>
    <Card.Content>
      <Card.Description>{post.content}</Card.Description>
    </Card.Content>
    <Card.Content extra >
      <Icon name={"thumbs up outline"} size="large" color="green"/>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Icon name={"thumbs down outline"} size="large" color="red"/>
    </Card.Content>
  </Card>
  );
}

export default PostCard;
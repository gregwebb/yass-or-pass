import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

function PostCard({ post }) {
 

    const clickHandler = 0;


    return (
        <div className="post-card">
          {post.user.username}
        </div>
      );
}

export default PostCard;

import React from "react";
import { Item } from "semantic-ui-react";
import './VibeCard.css';

function VibeCard({ user, posts, users }) {
    const emojis = ["👻","👽","🧑","👩","👨","🧓","👵","👴"];


    return (
        <div className="test">
        <div className="ui divider"></div>
        <Item.Group divided>
        <Item>
                <div className="emoji-vibe">
                {emojis[user.emoji]}
            </div> 
  
        <Item.Content>
          <Item.Header>
          <span className='user'>{user.username} </span> 

              </Item.Header>
          <Item.Meta>
          <span className='match'>Agrees 95%</span>
          </Item.Meta>

        </Item.Content>
      </Item>
      </Item.Group>
      </div>


      );
}

export default VibeCard;
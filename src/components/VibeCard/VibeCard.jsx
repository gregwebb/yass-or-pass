import React from "react";
import { Item } from "semantic-ui-react";
import './VibeCard.css';

function VibeCard({ user, posts, users, match, matches }) {
    const emojis = ["👻","👽","🧑","👩","👨","🧓","👵","👴"];


    return (
        <div className="test">
        <div className="ui divider"></div>
        <Item.Group divided>
        <Item>
                <div className="emoji-vibe">
                {emojis[user.emoji]}
                {match[0]}
            </div> 
  
        <Item.Content>
          <Item.Header>
          <span className='user'>{match[0]} </span> 

              </Item.Header>
          <Item.Meta>
          <span className='match'>{match[1]}%</span>
          </Item.Meta>

        </Item.Content>
      </Item>
      </Item.Group>
      </div>


      );
}

export default VibeCard;
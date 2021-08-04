import React from "react";
import { Button, Card, Icon, Item, Image } from "semantic-ui-react";
import './VibeCard.css';

function VibeCard({ user }) {
    const emojis = ["👻","👽","🧑","👩","👨","🧓","👵","👴"];


    return (
        <>
        <div class="ui divider"></div>
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
      </>


      );
}

export default VibeCard;
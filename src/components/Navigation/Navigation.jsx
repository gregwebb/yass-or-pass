import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';
import './Navigation.css';

const emojis = ["👻","👽","🧑","👩","👨","🧓","👵","👴"];

export default function Navigation({user, handleLogout}){
    return (
        <Segment className="navigation" clearing>
            <div className="title">
                <div className="yass-title">YASS👍</div>  
                <div className="or-title">or</div>  
                <div className="pass-title">PASS👎</div>  
            </div>
            <div className="emoji">{emojis[user]}</div>
            <div className="logout"><Link to='' onClick={handleLogout}>Logout</Link></div>
        </Segment>
    )
}
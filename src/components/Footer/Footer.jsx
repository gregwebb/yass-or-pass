import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';
import './Footer.css';


export default function Footer(){
    return (
        <Segment className="navigation" clearing>
            Yass or Pass &copy; 2021
        </Segment>
    )
}
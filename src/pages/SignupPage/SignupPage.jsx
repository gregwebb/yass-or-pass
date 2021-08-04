import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';
import { Col, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function SignUpPage(props){
 
  const [error, setError ] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState]  = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    emoji: ''
  });

  const history = useHistory()

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    // add this later
    e.preventDefault();

    // Photos have to be sent over as FormData
    // They send over the form in multiparts (multipe requests to the server)

    const formData = new FormData();


    // generating rest of form data by looping over the state object!
    for (let key in state){
      formData.append(key, state[key])
    }
    //fyi if you log out formData you won't see anything you have to use the folllowing

    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }

    // SO now we have are data prepared to send over in our formData object
    try {
      // refere to the utils/userService, to look at the signup fetch function
      await userService.signup(formData);
      // setTheUser in our app
      props.handleSignUpOrLogin() // gets the token from localstorage and updates the user state in our app.js
      // with the correct user object from the current token
      // then route to the homepage
      history.push('/') // defined above from react-router-dom
      // after this we can go whereever

    } catch(err){
      console.log(err.message)
      setError(err.message)
    }

  }

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }
 
    
    return (
        <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='yass.png' />           
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>               
                    <Form.Input                    
                      name="username"
                      placeholder="username"
                      value={state.username}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input
                      type="email"                  
                      name="email"
                      placeholder="email"
                      value={ state.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input             
                      name="password"
                      type="password"
                      placeholder="password"
                      value={ state.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input     
                      name="passwordConf"
                      type="password"
                      placeholder="Confirm Password"
                      value={ state.passwordConf}
                      onChange={handleChange}
                      required
                    />
                    <FormGroup row>
                        <select name="emoji" defaultValue="" value={state.emoji} onChange={handleChange} required>
                            <option disabled={true} value="">Pick an emoji</option>
                            <option value="0">👻</option>
                            <option value="1">👽</option>
                            <option value="2">🧑</option>
                            <option value="3">👩</option>
                            <option value="4">👨</option>
                            <option value="5">🧓</option>
                            <option value="6">👵</option>
                            <option value="7">👴</option>                          
                        </select>
                    </FormGroup>
                    <br/>
                    <Button
                    color="blue"
                    fluid
                    size="large"
                    type="submit"
                    className="btn"
                    >
                    Signup
                  </Button>
                  </Segment>
                  {error ? <ErrorMessage error={error} /> : null}
                </Form>
               
            </Grid.Column>
          </Grid>
        </>
      );   
    
}

import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddPostForm(props){
  const [state, setState] = useState({
    content: ''
  })
  const [content, setContent] = useState({
    content: ''
  })


  function handleChange(e){
    setContent({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', state.content)
    props.handleAddPost(formData)
  }


  return (
    
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
    

            <Form  autoComplete="off" onSubmit={handleSubmit}>
            

              <Form.Input
                  className="form-control"
                  name="content"
                  value={content.content}
                  placeholder="Ask about something here..."
                  onChange={handleChange}
                  required
              />  


            
              <Button
                type="submit"
                className="btn"
              >
                See what people think
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}
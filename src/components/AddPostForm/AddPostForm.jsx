import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default function AddPostForm(props, { user }) {
  const [state, setState] = useState({
    content: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const post = state;
    props.handleAddPost(post);
    setState({ content: "" });
  }

  return (
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Input
            name="content"
            placeholder="Ask about something here..."
            value={state.content}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="btn">
            See what people think
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

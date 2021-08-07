import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useHistory } from "react-router-dom";
import { FormGroup } from "reactstrap";

export default function SignUpPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    emoji: "",
  });

  const history = useHistory();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.signup(state);
      props.handleSignUpOrLogin();
      history.push("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image src="yass.png" />
        <Form autoComplete="off" onSubmit={handleSubmit}>
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
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <FormGroup row>
              <select
                name="emoji"
                defaultValue=""
                value={state.emoji}
                onChange={handleChange}
                required
              >
                <option disabled={true} value="">
                  Pick an emoji
                </option>
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
            <br />
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
  );
}

import React, { useState, useMemo } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { navigate } from "@reach/router";
import { signUp } from "../MongodbFunctions";
import { useCookies } from "react-cookie";

import userIcon from "../assets/icons/user.svg";
import passwordIcon from "../assets/icons/password.svg";
import "./auth.scss";

const SignUp = (props) => {
  // Input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return;
    }
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setError("Please fill in all fields");
      return;
    }
    // saves the token as a cookie
    signUp(email, password).then(async (response) => {
      const body = await response.json();
      if (!response.ok) {
        setError(body.message);
      } else {
        setCookie("token", body.token);
        navigate("/");
      }
    });
  };

  const allFieldsFilled = useMemo(() => {
    return (
      email.length !== 0 &&
      password.length !== 0 &&
      confirmPassword.length !== 0
    );
  }, [email, password, confirmPassword]);

  return (
    <div className="auth_form_container">
      <Form className="auth_form" onSubmit={submitForm}>
        <h1 className="auth_header">Feeding San Diego</h1>
        <Form.Group className="input_field_container">
          <img class="icons" src={userIcon} alt="user icon"></img>
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value.trim())}
          />
        </Form.Group>
        <Form.Group className="input_field_container">
          <img class="icons" src={passwordIcon} alt="password icon"></img>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value.trim());
            }}
          />
        </Form.Group>

        <Form.Group className="input_field_container">
          <img class="icons" src={passwordIcon} alt="password icon"></img>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value.trim());
            }}
          />
        </Form.Group>

        {error.length ? <p className="warning">{error}</p> : ""}

        <Button
          type="submit"
          onClick={submitForm}
          className={allFieldsFilled ? "active" : ""}
        >
          Create Account
        </Button>
        <p className="white_text redirect">
          <a href="/login" className="white_text">
            Already have an account? Login here
          </a>
        </p>
      </Form>
    </div>
  );
};

export default SignUp;

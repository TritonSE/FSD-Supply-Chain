import React, { useState } from "react";
import { Link } from "@reach/router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { forgotPassword } from "../MongodbFunctions";
import userIcon from "../assets/icons/user.svg";

import "./auth.scss";

const ResetPassword = (props) => {
  // Input fields
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    forgotPassword(email).then(async (response) => {
      const body = await response.json();
      setResponse(response.status);
      setMessage(body.message);
    });
  };

  return (
    <div className="auth_form_container">
      <Form className="auth_form" onSubmit={submitForm}>
        <h1 className="auth_header">Feeding San Diego</h1>
        <p className="white_text">
          To reset your password, enter in your registered email and a reset
          link will be emailed to you.
        </p>
        <Form.Group className="input_field_container">
          <img class="icons" src={userIcon} alt="user icon"></img>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value.trim());
            }}
            required
          />
        </Form.Group>

        {message.length ? <p className="white_text">{message}</p> : ""}
        {response !== 200 && (
          <Button
            type="submit"
            onClick={submitForm}
            className={email.length > 0 ? "active" : ""}
          >
            Send Link
          </Button>
        )}

        <Link to="/login" className="white_text redirect sub_button">
          {response !== 200 ? "Cancel" : "Back to Log In"}
        </Link>
      </Form>
    </div>
  );
};

export default ResetPassword;

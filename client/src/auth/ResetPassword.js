import React, { useState, useMemo } from "react";
import { navigate } from "@reach/router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { resetPassword } from "../MongodbFunctions";
import passwordIcon from "../assets/icons/password.svg";

import "./auth.scss";

const ResetPassword = (props) => {
  // Input fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("The passwords do not match");
      return;
    }
    resetPassword(props.token, password).then(async (response) => {
      const body = await response.json();
      if (!response.ok) {
        setError(body.message);
      } else {
        navigate("/login");
      }
    });
  };

  const allFieldsFilled = useMemo(() => {
    return confirmPassword.length !== 0 && password.length !== 0;
  }, [confirmPassword, password]);

  return (
    <div className="auth_form_container">
      <Form className="auth_form" onSubmit={submitForm}>
        <h1 className="auth_header">Feeding San Diego</h1>
        <Form.Group className="input_field_container">
          <img class="icons" src={passwordIcon} alt="password icon"></img>
          <Form.Control
            type="password"
            placeholder="New Password"
            onChange={(event) => {
              setPassword(event.target.value.trim());
            }}
            required
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
            required
          />
        </Form.Group>

        {error.length ? <p className="warning">{error}</p> : ""}
        <Button
          type="submit"
          onClick={submitForm}
          className={allFieldsFilled ? "active" : ""}
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;

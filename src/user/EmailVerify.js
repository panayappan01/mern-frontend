import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { emailActivate } from "../auth/helper";

const EmailVerify = () => {
  let { verifyToken } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = () => {
    emailActivate(verifyToken).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully. Please{" "}
        <Link to="/signin">Login</Link> Here
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error} Please try again. <Link to="/signup">Signup</Link>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {successMessage()}
      {errorMessage()}
      <button
        onClick={verifyEmail}
        className="d-block btn btn-primary btn-lg px-4"
      >
        Verify
      </button>
    </div>
  );
};

export default EmailVerify;

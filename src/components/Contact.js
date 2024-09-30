import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setMessageSent(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    setValidated(true);
  };
  return (
    <div className="container w-50 mt-5 justify-content-center">
      <h2>Contact us</h2>
      <Form
        noValidate
        validated={validated}
        className="shadow-sm rounded px-5 py-5"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Message</Form.Label>
          <Form.Control
            required
            as="textarea"
            maxLength={300}
            placeholder="Message"
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </div>
      </Form>

      {messageSent && (
        <div className="alert alert-success mt-3">
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
}

export default Contact;

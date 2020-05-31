import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

const RegisterForm = ({onSubmit}) => {
  const { register, handleSubmit } = useForm()
  /* const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }; */

  return (
    <form onSubmit={/*() => onSubmit(form)*/handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          ref={register}
          type="text"
          className="form-control"
          name="avatar"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          ref={register}
          type="text"
          className="form-control"
          name="username"
          id="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          type="email"
          className="form-control"
          name="email"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          type="password"
          className="form-control"
          name="password"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          ref={register}
          type="password"
          className="form-control"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
      </div>
      <Button 
        type="submit"
        variant="secondary"
      >
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
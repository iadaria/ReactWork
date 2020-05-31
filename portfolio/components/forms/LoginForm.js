import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

const LoginForm = ({ onSubmit, loading }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          type="email"
          name="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {loading && "Signing in..."}
      {!loading && ( 
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      )}
    </form>
  );
};

export default LoginForm;

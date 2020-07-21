import React from "react";
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
//import Button from "react-bootstrap/Button";

const LoginForm = ({ onSubmit, loading }) => {
    const { handleSubmit, register } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: 300, margin: '0 auto'}} autoComplete="on">
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
                <Button variant="contained" type="submit" style={{backgroundColor: 'green', color: 'white'}}>
                    Submit
                </Button>
            )}
        </form>
    );
};

export default LoginForm;

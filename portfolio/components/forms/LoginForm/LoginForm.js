import React from "react";
import './login-form.scss';

import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = ({ onSubmit, loading }) => {
    const { handleSubmit, register } = useForm();

    return (
        <form 
            className="login-form"
            onSubmit={handleSubmit(onSubmit)} 
            autoComplete="on"
        >
            <TextField
                name="email"
                placeholder="Email"
                type="email"
                id="email"
                variant="filled"
                inputRef={register}
                //fullWidth
            />
{/*             <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                />
            </div> */}
            <TextField
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                variant="filled"
                inputRef={register}
                //fullWidth
            />
            {/* <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                />
            </div> */}
            {loading && "Signing in..."}
            {!loading && (
                <Button 
                    className="btn-login"
                    variant="contained" 
                    type="submit" 
                >
                    Submit
                </Button>
            )}
        </form>
    );
};

export default LoginForm;

import React, { useContext } from 'react';
import './register-form.sass';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { Button, CircularProgress, Typography } from '@material-ui/core';

import { RootStoreContext } from '../../../app/stores/rootStore';
import { IUserFormValues } from '../../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const validate = combineValidators({
    username: isRequired('username'),
    displayName: isRequired('display name'),
    email: isRequired('email'),
    password: isRequired('password')
});

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;

    return (
        <div className="register-form">
            <FinalForm
                onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                    [FORM_ERROR]: error //from axios and store inside const - FORM_ERROR
                }))}
                //validate={validate}
                render={({ 
                    handleSubmit, 
                    submitting, 
                    submitError, 
                    invalid, 
                    pristine, 
                    dirtySinceLastSubmit 
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="on" >
                        <Typography className="title" component="h2">
                            Sign up to Reactivities
                        </Typography>
                        <Field
                            name='username'
                            component={TextInput}
                            placeholder='Username'
                            label="Username"
                        />
                        <Field
                            name='displayName'
                            component={TextInput}
                            placeholder='Display Name'
                            label="Display Name"
                        />

                        <Field
                            name='email'
                            component={TextInput}
                            placeholder='Email'
                            label="Email"
                        />

                        <Field
                            name='password'
                            component={TextInput}
                            placeholder='Password'
                            type='password'
                            label="Password"
                            autoComplete="on"
                        />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage error={submitError} />
                                //text={JSON.stringify(submitError.data.errors)}/>
                        )}
                        <Button
                            className="btn-login"
                            type="submit"
                            disabled={(invalid && !dirtySinceLastSubmit) || submitting || pristine}
                            variant="contained"
                            fullWidth
                        >
                            {submitting && <CircularProgress size='1.3rem' />}
                            {!submitting && 'Register'}
                        </Button>
                        {/* <pre>{JSON.stringify(form.getState())}</pre> */}
                        {/* Cleare to read */}
                        {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
                    </form>
                )}
            />
        </div>
    );
};

export default RegisterForm;

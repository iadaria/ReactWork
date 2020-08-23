import './register-form.scss';
import React from 'react';
import ModalWrapper from '../../../app/common/modals/ModalWrapper';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { useDispatch } from 'react-redux';
//import { signInUser } from '../authActions';
import { closeModal } from '../../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../../app/firestore/firebaseService';
import SocialLogin from '../SocialLogin';

export default function RegisterForm() {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='xs' header="Register to Re-vents">
            <Formik
                initialValues={{
                    displayName: "",
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await registerInFirebase(values);
                        dispatch(closeModal());
                    } 
                    catch (error) { 
                        setErrors({auth: error.message})
                        console.log(error); 
                    } 
                    finally { setSubmitting(false); }
                }}
            >
                {({ isSubmitting, isValid, dirty, errors }) => {

                    const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                    return (
                        <Form className="ui register-form">
                            <Field
                                component={TextField}
                                name="displayName"
                                label="Display Name"
                                placeholder="Display Name"
                                variant="outlined"
                                size="small"
                            />

                            <Field
                                component={TextField}
                                name="email"
                                label="Email"
                                placeholder="Email Address"
                                variant="outlined"
                                size="small"
                            />

                            <Field
                                component={TextField}
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                variant="outlined"
                                size="small"
                            />

                            {errors.auth && <Alert severity="error">{errors.auth}</Alert>}

                            <Box className="event-buttons">
                            
                                {/* <Button
                                    disabled={isSubmitting}
                                    component={Link} to='/events'
                                    type="button"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    Cancel
                                </Button> */}

                                <Button
                                    className={isDisabledSubmit ? "default" : "btn-success"}
                                    type="submit"
                                    disabled={isDisabledSubmit}
                                    variant="contained"
                                    size="medium"
                                    fullWidth
                                >
                                    {isSubmitting && <CircularProgress size='1.3rem' />}
                                    {!isSubmitting && "Register"}
                                </Button>

                                <SocialLogin />

                            </Box>

                        </Form>
                    );
                }}
            </Formik>
        </ModalWrapper>
    );
}

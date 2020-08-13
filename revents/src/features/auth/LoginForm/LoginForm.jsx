import './login-form.scss';
import React from 'react';
import ModalWrapper from '../../../app/common/modals/ModalWrapper';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signInUser } from '../authActions';
import { closeModal } from '../../../app/common/modals/modalReducer';

export default function LoginForm() {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='xs' header="Sign in to Re-vents">
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={(values, { setSubmitting }) => {
                    //console.log('submit loginform', values);
                    dispatch(signInUser(values));
                    setSubmitting(false);
                    dispatch(closeModal());
                }}
            >
                {({ isSubmitting, isValid, dirty }) => {

                    const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                    return (
                        <Form className="ui login-form">
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
                                    {!isSubmitting && "Login"}
                                </Button>

                            </Box>

                        </Form>
                    );
                }}
            </Formik>
        </ModalWrapper>
    );
}

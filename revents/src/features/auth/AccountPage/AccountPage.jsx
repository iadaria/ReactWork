import './account-page.scss';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleLogo from './google.svg';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../../app/firestore/firebaseService';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AccountPage() {
    const { currentUser } = useSelector((state) => state.auth);

    return (
        <Paper className="account-page">
            <h2>Account</h2>
            <Divider />
            {currentUser.providerId === "password" &&
                <>
                    <h3>Change Password</h3>
                    <p>Use this form to change your password</p>
                    <Formik
                        initialValues={{
                            newPassword1: "",
                            newPassword2: ""
                        }}
                        validationSchema={Yup.object({
                            newPassword1: Yup.string().required("Password is required"),
                            newPassword2: Yup.string().oneOf(
                                [Yup.ref('newPassword1'), null],
                                "Password do not match"
                            )
                        })}
                        onSubmit={ async (values, {setSubmitting, setErrors}) => {
                            try {
                                await updateUserPassword(values);
                            } catch (error) {
                                setErrors({auth: error.message});    
                            } finally { setSubmitting(false); }
                        }}
                    >
                        {({ errors, isSubmitting, isValid, dirty }) => (
                            <Form
                                className="ui form"
                            >
                                <Field
                                    component={TextField}
                                    name="newPassword1"
                                    type="password"
                                    placeholder="New Password"
                                    variant="outlined"
                                    size="small"
                                />

                                <Field
                                    component={TextField}
                                    name="newPassword2"
                                    type="password"
                                    placeholder="Confirm Password"
                                    variant="outlined"
                                    size="small"
                                />

                                {errors.auth && <Alert severity="error">{errors.auth}</Alert>}

                                <Button
                                    style={{ backgroundColor: 'teal', color: 'white' }}
                                    disabled={!isValid || isSubmitting || !dirty}
                                    type="submit"
                                    size="medium"
                                    variant="contained"

                                >
                                    {isSubmitting && <CircularProgress size='1.3rem' />}
                                    {!isSubmitting && "Update password"}
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </>
            }
            {currentUser.providerId === "facebook.com" &&
                <>
                    <h3>Facebook account</h3>
                    <p>Please visit Facebook to update your account</p>
                    <Button
                        component={Link}
                        to="https://facebook.com"
                        startIcon={<FacebookIcon fontSize="large" />}
                        size="medium"
                        variant="contained"
                        color="primary"
                    >
                        Go to Facebook
                            </Button>
                </>
            }
            
            {currentUser.providerId === "google.com" &&
                <>
                    <h3>Google account</h3>
                    <p>Please visit Google to update your account</p>
                    <Button
                        style={{ backgroundColor: 'tomato', color: 'white' }}
                        component={Link}
                        to="https://google.com"
                        size="medium"
                        variant="contained"
                    >
                        <img style={{ marginRight: 10 }} width="20" height="20" src={GoogleLogo} alt="google login" />
                            Go to google
                    </Button>
                </>
            }

        </Paper>
    );
}

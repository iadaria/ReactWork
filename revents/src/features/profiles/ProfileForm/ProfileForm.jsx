import React from 'react';
import './profile-form.scss';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Alert from '@material-ui/lab/Alert';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../app/firestore/firestoreService';


export default function ProfileForm({ profile }) {
    return (
        <Formik
            initialValues={{
                displayName: profile.displayName,
                description: profile.description || ""
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                    await updateUserProfile(values);
                } catch (error) {
                    toast.error(error.message);
                } finally { setSubmitting(false); }
            }}
        >
            {({ isSubmitting, isValid, dirty, errors }) => {
                const isDisabledSubmit = !isValid || !dirty || isSubmitting;

                return (
                    <Form
                        className="profile-form ui login-form"
                    >
                        <Field
                            component={TextField}
                            name='displayName'
                            placeholder='Display name'
                            label="Display name"
                            variant="outlined"
                            size="small"
                        />
                        <Field
                            component={TextField}
                            name="description"
                            multiline
                            placeholder="Description"
                            rows={3}
                            variant="outlined"
                            size="small"
                        />

                        {/* {errors.auth && <Alert severity="error">{errors.auth}</Alert>} */}

                        <Button
                            className="btn-success"
                            color="primary"
                            type="submit"
                            disabled={isDisabledSubmit}
                            variant="contained"
                            size="small"
                        >
                            {isSubmitting && <CircularProgress size='1.3rem' />}
                            {!isSubmitting && "Update profile"}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}
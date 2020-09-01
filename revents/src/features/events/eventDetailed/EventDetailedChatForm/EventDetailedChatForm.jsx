import './event-detailed-chat-form.scss';
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../../app/firestore/firebaseService';
import * as Yup from 'yup';

export default function EventDetailedChatForm({ eventId, parentId, closeForm }) {
    //const { loading } = useSelector((state) => state.async);
    
    return (
        <Formik
            initialValues={{ comment: '' }}
            validationSchema={Yup.object({
                comment: Yup.string().required()
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    await addEventChatComment(eventId, {...values, parentId});
                    resetForm();
                } catch (error) {
                    toast.error(error.message);
                } finally { setSubmitting(false); closeForm(); }
            }}
        >
            {({ isSubmitting, handleSubmit, isValid }) => (
                <Form
                    style={{width: '100%'}}
                    className="event-detailed-chat-form"
                >
                    <Field
                        component={TextField}
                        name="comment"
                        //label="Comment"
                        //placeholder="Please enter your comment here"
                        variant="outlined"
                        //multiline
                        //rows={3}
                        fullWidth
                    >
                        {({ field }) => (
                            <div>
                                {isSubmitting && <CircularProgress size='1.3rem' />}
                                <textarea
                                    style={{width: '100%', padding: 10}}
                                    rows="3" {...field}
                                    placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.shiftKey) {
                                            return;
                                        }
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            isValid && handleSubmit();
                                        }
                                    }}
                                >
                                </textarea>
                            </div>
                        )}
                    </Field>
                    {/* <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 10 }}
                        size="small"
                        startIcon={!isSubmitting && <EditIcon />}
                    >
                        {isSubmitting && <CircularProgress size='1.3rem' />}
                        {!isSubmitting && 'Add Reply'}
                    </Button> */}
                </Form>
            )}

        </Formik>
    );
}

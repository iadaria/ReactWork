import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import { InputLabel, FormControl } from '@material-ui/core';

//Section 7: Forms revisited Lesson 63.Creating a reusable text input
export default function MyTextInput(props) {
    const {label} = props;
    const [field, meta, helpders] = useField(props);
    return (
        <div className="form-control">
            <label>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <InputLabel color="secondary">{meta.error}</InputLabel>
            ) : null}
        </div>
    );
}

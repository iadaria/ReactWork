import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { StandardTextFieldProps } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

interface IProps extends 
    FieldRenderProps<string, HTMLElement>
    ,StandardTextFieldProps
    {}

const TextInput: React.FC<IProps> = ({
    input: {name, /* onChange, */ value, ...restInput},
    placeholder, 
    meta: {touched, error},
    ...rest
}) => {
    //console.log(props);
    return (
        <TextField 
            {...rest}
            value={value}
            InputProps={restInput}
            /* onChange={onChange}  */
            
            helperText={touched ? error : undefined}
            error={touched && !!error}
            variant="outlined"
            size="small"
            fullWidth
        />

        /* <TextField error={touched && !!error} type={type}>
            <input {...input} placeholder={placeholder} type='text'/>
            {touched && error && (
                <label style={{color: 'red'}}>{error}</label>
            )}
        </TextField> */
    );
}

export default TextInput;
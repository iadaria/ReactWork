import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { TextareaAutosizeProps } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';

interface IProps extends 
    FieldRenderProps<string, HTMLElement>
    ,TextareaAutosizeProps
    {}


const TextAreaInput: React.FC<IProps> = ({
    input: {value, ...restInput},
    placeholder, 
    meta: {touched, error},
    ...rest
}) => {
    return (
        <FormControl
            error={touched && !!error}
            fullWidth>
            <TextareaAutosize
                {...restInput}
                {...rest}
                value={value}
                placeholder={placeholder}
                style={{width: '100%'}}
                color="secondary"       
            />
        </FormControl>
    );
};

export default TextAreaInput;

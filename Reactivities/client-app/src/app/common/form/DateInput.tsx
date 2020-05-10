import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { StandardTextFieldProps } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText  from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

interface IProps extends 
    FieldRenderProps<Date, HTMLElement>
    ,StandardTextFieldProps
    {}

const DateInput: React.FC<IProps> = (props) => {
    const {
        input: { value,  onChange,  ...restInput},
        placeholder, 
        meta: {touched, error},
        ...rest
    } = props;
    let errorText = "";
    console.log("props in SelectInput");
    console.log(props);
    return (
        <FormControl
            error={touched && !!error}
            variant="outlined"
            color="secondary"
            fullWidth
        >
            <DateTimePicker
                placeholder={placeholder}
                value={value || null}
                onChange={onChange}
                inputProps={restInput}
            />
            {/* <FormHelperText>{errorText}</FormHelperText> */}
        </FormControl>
    );
};

export default DateInput;

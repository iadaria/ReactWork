import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { StandardTextFieldProps } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText  from '@material-ui/core/FormHelperText';
import './date-input.sass';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

interface IProps extends 
    FieldRenderProps<Date, HTMLElement>
    ,StandardTextFieldProps
    {}

const DateInput: React.FC<IProps> = (props) => {
    const {
        input: { value,  onChange,  ...restInput},
        placeholder, 
        date = false,
        time = false,
        meta: {touched, error},
        fullWidth = true,
        ...rest
    } = props;
    let errorText = "";
    //console.log("props in SelectInput");
    //console.log(props);
    return (
        <FormControl
            className="date-input"
            error={touched && !!error}
            fullWidth={fullWidth}
        >
            <DateTimePicker
                placeholder={placeholder}
                value={value || null}
                onChange={onChange}
                date={date}
                time={time}
                inputProps={restInput}
            />
            {/* <FormHelperText>{errorText}</FormHelperText> */}
        </FormControl>
    );
};

export default DateInput;

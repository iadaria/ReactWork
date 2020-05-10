import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FormControl from '@material-ui/core/FormControl';
//import FormHelperText  from '@material-ui/core/FormHelperText';
import { 
    KeyboardTimePicker, 
    TimePickerViewsProps } from '@material-ui/pickers';
import './date-input.sass';

interface IProps extends 
    FieldRenderProps<Date, HTMLElement>
    ,TimePickerViewsProps
    {}

const TimeInput: React.FC<IProps> = (props) => {
    const {
        input: {value, name, onChange/* , ...restInput */},
        placeholder, 
        //date = false,
        //time = false,
        meta: {touched, error},
        fullWidth = true,
        ...rest
    } = props;
    //let errorText = "";
    //console.log("props in SelectInput");
    //console.log(props);
    return (
            <FormControl
                //className="date-input"
                error={touched && !!error}
                fullWidth={fullWidth}
            >
                <KeyboardTimePicker 
                    name={name}
                    value={value || null}
                    onChange={onChange}
                    //format="MM/dd/yyyy"
                    //inputProps={restInput}
                    error={touched && !!error}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    size="small"
                    keyboardIcon={<AccessTimeIcon/>}
                    {...rest}
                />
                {/* <FormHelperText>{errorText}</FormHelperText> */}
            </FormControl>
    );
};

export default TimeInput;

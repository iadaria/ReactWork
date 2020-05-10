import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import Select from '@material-ui/core/Select';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { SelectProps} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText  from '@material-ui/core/FormHelperText';
import { ICategory } from '../../models/category';

interface IProps extends 
    FieldRenderProps<string, HTMLElement>
    ,SelectInputProps
    {}

const SelectInput: React.FC<IProps> = (props) => {
    const {
        input: { value,  onChange,  ...restInput},
        options,
        placeholder, 
        meta: {touched, error},
        ...rest
    } = props;
    let errorText = "";
    //console.log("props in SelectInput");
    //console.log(props);
    return (
        <FormControl
            error={touched && !!error}
            fullWidth
        >
            {/* <InputLabel id="demo-simple-select-error-label">Name</InputLabel> */}
            <Select
                native
                /* labelId="demo-simple-select-error-label"
                id="demo-simple-select-error" */
                value={value}
                onChange={(e, data?) => onChange(e.target.value)}
                inputProps={restInput} 
                placeholder={placeholder}
                {...rest}
                variant="outlined"
                color="secondary"
                fullWidth
            >
                <option aria-label="None" value="" />
                {options.map((item: ICategory) => {
                    //console.log(item);
                    return <option key={item.key} value={item.value}>{item.text}</option>
                })}
            </Select>
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
};

export default SelectInput;

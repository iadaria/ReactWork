import './my-place-input.scss';
import React from 'react';
/* import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; */

import { Field, useField } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import { Select } from 'formik-material-ui';
// //import { Autocomplete } from "@material-ui/lab";
// import { TextField } from 'formik-material-ui';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';



export default function MyPlaceInput({ label, options, ...props }) {
    //const { options, setFieldValue } = props;
    const [field, meta, helpers] = useField(props);

    function handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { helpers.setValue({ address, latLng }) })
            .catch(error => helpers.setError(error));
    };

    function handleBlur(e) {
        field.onBlur(e);
        if (!field.value.latLng) {
            helpers.setValue({address: '', latLng: null});
        }
    }

    return (
        <PlacesAutocomplete
            value={field.value['address']}
            onChange={value => {
                helpers.setValue({ address: value });
                //console.log('onChange -> helpers.setValue', { address: value });
            }}
            onSelect={value => {
                handleSelect(value);
                //console.log('onSelect -> handleSelect', value);
            }}
            searchOptions={options}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                console.log('inputPorps', { ...getInputProps({ name: field.name, ...props }) });
                console.log('label', { label });
                console.log('props', { props });
                return (
                    <div className="my-place-input">

                        <input
                            {...getInputProps({
                                name: field.name,
                                onBlur: (event) => handleBlur(event), //field.onBlur,
                                placeholder: 'City. Search Places ...',
                                className: `location-search-input ${meta.touched && meta.error ? "error" : null}`,
                                ...props
                            })}
                        />
                        {meta.touched && meta.error ? (
                            <FormHelperText className="error" error={true}>
                                {meta.error['address']}
                            </FormHelperText>
                        ) : null}
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {

                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };

                                return (
                                    <div
                                        className="suggestion"
                                        key={suggestion.description}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span key={index}>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            }}
        </PlacesAutocomplete>
    );
};
/*  <FormControl>
        <InputLabel htmlFor="City">City</InputLabel>
        <Field
            component={Select}
            inputProps={{ ...getInputProps({ name: field.name, ...props }) }}
        >
            {suggestions.map((suggestion, index) => (

                <MenuItem value={suggestion.formattedSuggestion.mainText}>
                    {suggestion.formattedSuggestion.secondaryText}
                </MenuItem>

            ))}
    </Field>
                    </FormControl> */
/* <div className="form-control">
        <label>{label}</label>
        <input {...getInputProps({name: field.name, ...props})} />
        {meta.touched && meta.error ? (
            <InputLabel color="secondary">{meta.error}</InputLabel>
        ) : null}

        {suggestions?.length > 0 && (
            <List style={{zIndex: 1000, width: '100%'}}>
                {suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={suggestion.formattedSuggestion.mainText}
                            secondary={suggestion.formattedSuggestion.secondaryText}
                        />
                    </ListItem>
                ))}
            </List>
        )}
    </div> */
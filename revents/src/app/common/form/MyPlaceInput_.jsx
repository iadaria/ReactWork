import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import { InputLabel, FormControl } from '@material-ui/core';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';



export default function MyPlaceInput({label, options, ...props}) {
    const [field, meta, helpers] = useField(props);

    function handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { helpers.setValue({address, latLng}); console.log('handleSelect -> helpers.setValue', {address, latLng}) })
            .catch(error => helpers.setError(error));
    };

    return (
        <PlacesAutocomplete
            value={field.value['address']}
            onChange={value => { 
                helpers.setValue({address: value}); 
                console.log('onChange -> helpers.setValue', {address: value});
            }}
            onSelect={value => {
                handleSelect(value);
                console.log('onSelect -> handleSelect', value);
            }}
            searchOptions={options}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="form-control">
                <label>{label}</label>
                <input {...getInputProps({name: field.name, ...props})} />
                {meta.touched && meta.error ? (
                    <InputLabel color="secondary">{meta.error}</InputLabel>
                ) : null}
                
                {suggestions?.length > 0 && (
                    /* <List style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}> */
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
            </div>
        )}
        </PlacesAutocomplete>
    );
};

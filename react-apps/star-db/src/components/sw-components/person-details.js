import React from 'react';
import ItemDetails, { Record } from '../item-details/item-details';
//import { SwapiServiceConsumer } from '../swapi-service-context'; //dependency injection
import { withSwapiService } from '../hoc-helper';

const PersonDetails = (props) => {//({ itemId, getData, getImageUrl }) => {
    return (
        <ItemDetails {...props}
            //itemId={itemId}
            //getData={getPerson}
            //getImageUrl={getPersonImage} 
        >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

export default withSwapiService(PersonDetails, mapMethodsToProps);

//Before wrapped to withSwapiService
/* const PersonDetails = ({ itemId }) => {
    return (
        <SwapiServiceConsumer>
            {
                //swapiService => {
                ({getPerson, getPersonImage}) => {
                    return (
                        <ItemDetails 
                            itemId={itemId}
                            getData={getPerson}
                            getImageUrl={getPersonImage} 
                        >
                            <Record field="gender" label="Gender" />
                            <Record field="eyeColor" label="Eye Color" />
                        </ItemDetails>
                    );
                }
            }
        </SwapiServiceConsumer>
    );
}; */
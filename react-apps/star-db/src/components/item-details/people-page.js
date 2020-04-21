import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ItemDetails from './item-details';
import ItemList from '../item-list';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
    }

    handlePersonSelected = (id) => {
        console.log('set id=' + id);
        this.setState( {
            selectedPerson: id,
        });
    };

    render() {
        const itemList = (
            <ItemList 
                itemSelected={this.handlePersonSelected}
                getData={this.swapiService.getAllPeople}
            >
                { item => (
                    `${item.name} (${item.birthYear})`
                  )
                } 
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return ( 
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        );
    }
}
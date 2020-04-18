import React, { Component } from 'react';
import PersonDetails from '../person-details/person-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';

import './people-page.css';

export default class PeoplePage extends Component {

    state = {
        selectedPerson: null,
        hasError: false,
    }

    componentDidCatch = () => this.setState({hasError: true});

    handlePersonSelected = (id) => {
        console.log('set id=' + id);
        this.setState( {
            selectedPerson: id,
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="row mb-3">
                <div className="col-md-6">
                    <ItemList personSelected={this.handlePersonSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
            </div>
        );
    }
}

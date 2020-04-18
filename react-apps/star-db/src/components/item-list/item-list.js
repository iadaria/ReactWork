import React, { Component } from 'react';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: null,
        loading: true,
        error: false
    };

    onPeopleLoaded = peopleList => 
        this.setState({
            peopleList,
            loading: false,
            error: false,
        })

    onError = error => this.setState({ error: true, loading: false });

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then(this.onPeopleLoaded)
            .catch(this.onError);
    }

    render() {
        const { peopleList, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? 
            <PeopleList 
                peopleList={peopleList} 
                personSelected={this.props.personSelected}
            /> : 
            null;

        return (
            <ul className="item-list list-group">
                {errorMessage}
                {spinner}
                {content}
            </ul>
        );
    }  
};

const PeopleList = ({ peopleList, personSelected }) => {
    return (
        <ul className="item-list list-group">
            { peopleList.map(person => 
                <PersonView 
                    key={person.id}
                    name={person.name} 
                    personSelected={() => personSelected(person.id)} 
                />
              ) 
            }
        </ul>
    );
};

const PersonView = ({ name, personSelected }) => {
    return (
        <li className="list-group-item" onClick={personSelected}>
            {name}
        </li>
    );
};
import React, { Component, Fragment } from 'react';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false,
        error: false,
    };

    componentDidMount = () => this.setState({loading: false});

    componentDidUpdate(prevProps, prevState) {
        const prevId = prevProps.personId;
        let id = this.props.personId;
        if (prevId === id || !id) console.log("it is equal");
        else {
            console.log('it is not equal');
            this.updatePerson(id);
        }
    }

    onPersonLoaded = person => {
        console.log(person);
        this.setState({
            person,
            loading: false,
            error: false,
        });
    };

    sleep = (ms) => (response) => 
        new Promise(resolve => setTimeout(() => resolve(response), ms));

    onError = error => this.setState({ error: true, loading: false });

    updatePerson = (id) => {
        this.setState({
            loading: true,
            error: false,
        });
        this.swapiService
            .getPerson(id)
            //.then(this.sleep(1000))
            .then(this.onPersonLoaded)
            .catch(this.onError);
    }

    render() {
        const { person, loading, error } = this.state;
        const hasData = !(loading || error) && person;
        
        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? 
            <Spinner /> : 
            person ? null : <span>Select a person from a list</span>;
                
        const content = hasData ? 
            <PersonView person={person}/> : 
            null;


        return (
            <Fragment>
                {errorMessage}
                {spinner}
                {content}
            </Fragment>
        );
    }
};


const PersonView = ({ person }) => {
    const {id, name, gender, birthYear, eyeColor} = person;
    return (
        <div className="person-details card">
            <img className="person-imgae"
                width="150"
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt="character"
            />
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </div>
    );
};
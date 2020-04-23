import React, { Component } from 'react';
import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';

export default class PeoplePage extends Component {
    state = {
        selectedItem: null,
    };

    handleItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<PersonList itemSelected={this.handleItemSelected} />}
                right={<PersonDetails itemId={selectedItem} />}
            />
        );
    }
}
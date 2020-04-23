import React, { Component } from 'react';
import { StarshipList, StarshipDetails } from '../sw-components';
import Row from '../row';

export default class StarshipsPage extends Component {
    state = {
        selectedItem: null,
    };

    handleItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<StarshipList itemSelected={this.handleItemSelected} />}
                right={<StarshipDetails itemId={selectedItem} />}
            />
        );
    }
}
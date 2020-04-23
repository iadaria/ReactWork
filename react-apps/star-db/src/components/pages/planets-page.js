import React, { Component } from 'react';
import { PlanetList, PlanetDetails } from '../sw-components';
import Row from '../row';

export default class PlanetsPage extends Component {
    state = {
        selectedItem: null,
    };

    handleItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<PlanetList itemSelected={this.handleItemSelected} />}
                right={<PlanetDetails itemId={selectedItem} />}
            />
        );
    }
}
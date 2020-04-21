import React, { Component } from 'react';
import Spinner from '../spinner';
//import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

class ItemList extends Component {
    //swapiService = new SwapiService();

    state = {
        itemList: null,
        //peopleList: null,
        loading: true,
        error: false
    };

    onListLoaded = itemList => 
        this.setState({
            //peopleList,
            itemList,
            loading: false,
            error: false,
        })

    onError = error => this.setState({ error: true, loading: false });

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(this.onListLoaded)
            .catch(this.onError);
    }

    render() {
        const { itemList, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? 
            <ListView
                itemList={itemList}
                renderItem={this.props.children}//renderItem}
                itemSelected={this.props.itemSelected}
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

const ListView = ({ itemList, renderItem, itemSelected }) => {
    return itemList.map(item => {
        const { id } = item;
        const label = renderItem(item);
        return (
            <li className="list-group-item" 
                key={id}
                onClick={() => itemSelected(id)}
            >
                {label}
            </li>
        );
    });
};

const f = () => {
    return <ItemList />;
};

export default f();
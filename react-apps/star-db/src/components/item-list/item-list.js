import React from 'react';
//import { withData } from '../hoc-helper';
//import Spinner from '../spinner';
//import ErrorIndicator from '../error-indicator';

import './item-list.css';

const ItemList = (props) => {

    const { data, itemSelected, children: renderLabel } = props;

    const items = data.map(item => {
        const label = renderLabel(item);
        const { id } = item;

        return (
            <li className="list-group-item" 
                key={id}
                onClick={() => itemSelected(id)}
            >
                {label}
            </li>
        );
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
    
};

export default ItemList;

/* const ListView = ({ itemList, renderItem, itemSelected }) => {
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
}; */

/* class ItemList extends Component {
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
}; */
import React, {Component} from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    render() {

        const { onAll, onActive, onDone} = this.props;

        return (
            <div className="btn-group">
                <button type="button"
                        className="btn btn-outline-info active"
                        onClick={onAll}>
                            All
                </button>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onActive}>
                            Active
                </button>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onDone}>
                            Done
                </button>
            </div>
        );
    };
}

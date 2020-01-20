import React, {Component} from 'react';

import './todo-list-item.css';
import './todo-list-item-label.css';

export default class TodoListItem extends Component {

    render() {

        const { 
            label, 
            onDeleted,
            onToggleImportant,
            onToggleDone,
            important, done } = this.props;

        let classNames = 'todo-list-item';
        classNames += done ? ' done' : '';
        classNames += important ? ' important' : '';

        return (
            <span className={classNames}>
                <span 
                    className="todo-list-item-label"
                    onClick={onToggleDone}>
                    { label }
                </span>
    
                <button type="button"
                        className="btn btn-outline-success btn-smart float-right"
                        onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>
    
                <button type="button"
                        className="btn btn-outline-danger btn-smart float-right"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
    
        );
    };
}

// const TodoListItemFunc = ( { label, important = false } ) => {
    
//     const style = {
//         color: important ? 'steelblue' : 'black',
//         fontWeight: important ? 'bold' : 'normal'
//     };
    
//     return (
//         <span className="todo-list-item">
//             <span 
//                 className="todo-list-item-label" 
//                 style={style}>
//                 { label }
//             </span>

//             <button type="button"
//                     className="btn btn-outline-success btn-smart">
//                 <i className="fa fa-exclamation" />
//             </button>

//             <button type="button"
//                     className="btn btn-outline-success btn-smart">
//                 <i className="fa fa-trash-o" />
//             </button>
//         </span>

//     );
// };

// export default TodoListItem;
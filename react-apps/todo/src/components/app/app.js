import React, {Component} from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;
    //react element
    state =  {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all' //active, all, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
            hidden: false
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {

            const index = todoData
                .findIndex((element) => element.id === id);
            // [a, b, c, d, e]
            // [a, b,    d, e]

            const todoDataWithoutElement = [
                ...todoData.slice(0, index), //before element
                ...todoData.slice(index + 1) //after element
            ];

            return {
                todoData: todoDataWithoutElement
            };
        });
    }

    addItem = (text) => {

        this.setState(({todoData}) => {
            const todoDataAfterAdded = [
                ...todoData,
                this.createTodoItem(text)
            ];
    
            return {
                todoData: todoDataAfterAdded
            };
        });
    }

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((element) => element.id === id);
        const oldItem = arr[index];
        const refreshedItem = { 
            ...oldItem, 
            [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, index),
            refreshedItem,
            ...arr.slice(index + 1)
        ];
    }

    toggleDone = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };       
        });
    };

    toggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        })
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item
                .label.toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default: 
                return items;
        }
    }

    handleSearchChange = (term) => {
        this.setState( {term} );
    };

    handleFilterChange = (filter) => {
        this.setState({ filter });
    };

    render() {
        //filter create new array
        const { todoData, term, filter } = this.state;

        const searchedItems = this.search(todoData, term);
        const filteredItems = this.filter(searchedItems, filter);

        const countOfDone = todoData.filter((el) => !el.done).length;
        const countOfTodo = todoData.length - countOfDone;

        return (
            <div className="todo-app">
                <AppHeader toDo={countOfDone} done={countOfTodo}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.handleSearchChange} />
                    <ItemStatusFilter 
                        filter={filter} 
                        onFilterChange={this.handleFilterChange} />
                </div>
                
                <TodoList 
                    todos={filteredItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.toggleImportant}
                    onToggleDone={this.toggleDone}
                    />
                    
                <ItemAddForm 
                    onAdd={this.addItem}/>
            </div>
        );
    }  
};
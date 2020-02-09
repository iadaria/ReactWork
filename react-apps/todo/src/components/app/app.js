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

    searchItems = (searchingWord) => {
        this.setState(({ todoData }) => {      
            const searchedItems 
                = todoData.filter(item => item.label.includes(searchingWord));

            return {
                todoData: this.doHideItems(todoData, searchedItems, 'hidden', false)
            }     
        });
    }

    allItems = () => {
        this.setState(({ todoData }) => {
            const allItems = [...todoData];
            allItems.forEach(item => item.hidden = false);

            return {
                todoData: allItems
            };
        });
    }

    activeItems = () => {
        this.setState(({ todoData }) => {
            const doneItems = todoData.filter(item => item.done === false);
            
            return {
                todoData: this.doHideItems(todoData, doneItems, 'hidden', false)
            }
        });
    }

    doneItems = () => {
        this.setState(({ todoData }) => {
            const doneItems = todoData.filter(item => item.done === true);
            
            return {
                todoData: this.doHideItems(todoData, doneItems, 'hidden', false)
            }
        });
    }

    doHideItems(allItems, searchedItems, propName, value) {

        searchedItems.forEach(item => item.hidden = value);
        
        const searchedIds = searchedItems.map(item => item.id);
        const expectItems = allItems.filter(item => !searchedIds.includes(item.id));
        expectItems.forEach(item => item[propName] = !value);

        return [
            ...searchedItems,
            ...expectItems
        ];
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

    handleSearchChange = (term) => {
        this.setState( {term} );
    };

    render() {
        //filter create new array
        const { todoData, term } = this.state;

        const visibleItems = this.search(todoData, term);
        const countOfDone = todoData.filter((el) => !el.done).length;
        const countOfTodo = todoData.length - countOfDone;

        return (
            <div className="todo-app">
                <AppHeader toDo={countOfDone} done={countOfTodo}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.handleSearchChange}/>
                    <ItemStatusFilter 
                        onAll={this.allItems}
                        onActive={this.activeItems}
                        onDone={this.doneItems}/>
                </div>
                
                <TodoList 
                    todos={visibleItems}
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
import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import {
  handleAddToDo,
  handleRemoveToDo,
  handleToggleToDo
} from '../actions/todos'

class ToDos extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddToDo(
      this.input.value,
      () => this.input.value = ''
    ));
  };
  removeToDo = (todo) => {
    this.props.dispatch(handleRemoveToDo(todo));
  };
  toggleToDo = (id) => {
    this.props.dispatch(handleToggleToDo(id));
  }
  render() {
    return(
      <div>
        <h1>To Do List</h1>
        <input
          type="text"
          placeholder="Add To Do"
          ref={(input) => this.input = input}
          >
        </input>
        <button onClick={this.addItem}>Add To Do</button>
        <List items={this.props.todos} remove={this.removeToDo} toggle={this.toggleToDo} />
      </div>
    )
  }
}

// Connected Component to get the state and dispatch function to pass along to the Presentational Component
export default connect((state) => ({
  todos: state.todos
}))(ToDos)
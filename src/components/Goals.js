import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import {
  handleAddGoal,
  handleRemoveGoal
} from '../actions/goals'

class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddGoal(
      this.input.value,
      () => this.input.value = '')
    );
  };
  removeGoal = (goal) => {
    this.props.dispatch(handleRemoveGoal(goal))
  };
  render() {
    return(
      <div>
        <h1>Goals List</h1>
        <input
          type="text"
          placeholder="Add Goal"
          ref={(input) => this.input = input}
          >
        </input>
        <button onClick={this.addItem}>Add Goal</button>
        <List items={this.props.goals} remove={this.removeGoal} />
      </div>
    )
  }
}

// Connected Component to get the goals state and dispatch function to pass along to the presentational component
export default connect((state) => ({
  goals: state.goals
}))(Goals)
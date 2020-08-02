import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
};

function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
};

export function handleAddGoal(name, callback) {
  return (dispatch) => {
    API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoal(goal));
        callback();
      })
      .catch(() => alert('Something went wrong. Please try again.'));
  }
}

export function handleRemoveGoal(goal) {
  return (dispatch) => {
    // Optimistic update
    dispatch(removeGoal(goal.id));
    return API.deleteGoal(goal.id)
      .catch(() => {
        // If something goes wrong, put it back on the list
        dispatch(addGoal(goal));
        alert('Sothing went wrong. Try again.');
      }
    )
  }
}
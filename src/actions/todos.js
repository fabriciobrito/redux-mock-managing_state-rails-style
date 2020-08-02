import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addToDo(todo) {
  return {
    type: ADD_TODO,
    todo
  }
};

function removeToDo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
};

function toggleToDo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
};

export function handleAddToDo(name, callback) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addToDo(todo));
        callback();
      })
      .catch(() => alert('Something went wrong. Please try again.'));
  }
}

// Handle Remove ToDo
export function handleRemoveToDo(todo) {
  return (dispatch) => {
    // Optimistic update locally
    dispatch(removeToDo(todo.id))
    return API.deleteTodo(todo.id)
      // If something goes wrong, put it back on the list
      .catch(() => {
        dispatch(addToDo(todo));
        alert('Sothing went wrong. Try again.')
      })
  }
}

// Handle Toggle ToDo Completeness
export function handleToggleToDo(id) {
  return (dispatch) => {
    // Optimistic update locally
    dispatch(toggleToDo(id));
    return API.saveTodoToggle(id)
      .catch(() => {
        // If something goes wrong, revert the local complete status back to previous state
        dispatch(toggleToDo(id));
        alert('An error occurred. Please try again.');
      })
  }
}

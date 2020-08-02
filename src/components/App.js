import React from 'react';
import { connect } from 'react-redux';
import ConnectedToDos from './ToDos';
import ConnectedGoals from './Goals';
import {
  handleInitialData
} from '../actions/shared';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  };
  render() {
    if(this.props.loading === true)
      return (
        <h3>Loading...</h3>
      );
    return(
      <div>
          <ConnectedToDos />
          <ConnectedGoals />
      </div>
    )
  }
}

// Connected Component to get the store and call the presentational component
export default connect((state) => ({
  loading: state.loading
}))(App)
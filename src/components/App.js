import React, { Component } from 'react';

import ListItems from './ListItems'
import NewItemForm from './NewItemForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListItems />
        <NewItemForm />
      </div>
    );
  }
}

export default App;

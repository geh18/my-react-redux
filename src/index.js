import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import Root from './components/Root.tsx'

import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Root store={store}/>
  </BrowserRouter>,
  document.getElementById('root')
);

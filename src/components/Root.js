import React from 'react'
import { Provider } from "react-redux";
import { Switch, Route } from 'react-router-dom'

import App from './App';


const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
        <Route exact path='/' component={App} />
    </Switch>
  </Provider>
)

export default Root

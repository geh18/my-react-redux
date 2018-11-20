import React from 'react'
import { Provider } from "react-redux";
import { Switch, Route } from 'react-router-dom'

import App from './App.tsx';


const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
        <Route path='/:filter?' component={App} />
    </Switch>
  </Provider>
)

export default Root

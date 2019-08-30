import React from 'react'
import { Switch, Route, Redirect } from 'react-router'


import Home from '../components/home/home'
import Wallet from '../components/wallet/Wallet'

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/wallet" component={Wallet} />
        <Redirect from='*' to='/' />
    </Switch>
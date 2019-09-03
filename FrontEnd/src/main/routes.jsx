import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import Wallet from '../components/wallet/Wallet'
import Transactions from '../components/trasactions/Transaction'
import PersonalSettings from '../components/personalSettings/PersonalSettings'

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/personalSettings" component={PersonalSettings} />
        <Redirect from='*' to='/' />
    </Switch>
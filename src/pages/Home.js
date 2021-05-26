import React from 'react'
import Auth from '../components/Auth'
import Questioning from '../components/Questioning'
import Testing from '../pages/Testing'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


function Home() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/questioning'} exact component={Questioning} />
                <Route path={'/questioning/:name'} exact component={Questioning} />
                <Route path="/testing" component={Testing} />
                <Auth />
            </Switch>
        </BrowserRouter>
    )
}

export default Home
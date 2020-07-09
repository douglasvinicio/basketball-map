import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateCourt from './pages/CreateCourt';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={ Home } path='/' exact />
            <Route component={ CreateCourt } path='/create-court'/>
        </BrowserRouter>
    );
}

export default Routes;
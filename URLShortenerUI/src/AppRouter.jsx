import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import Redirect from './pages/Redirect';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/:id" component={Redirect} />
            </div>
        </Router>
    );
};

export default AppRouter;
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import './scss/app';
import Home from './ChirpRoutes/home';
import EditChirp from './ChirpRoutes/adminPage';
import AddChirp from './ChirpRoutes/addNewChirp';

const App: React.SFC<IAppProps> = () => {

    return (
        <Router>
            <React.Fragment>
                <div className="d-flex justify-content-end m-3">
                    <Link className="btn btn-primary" to="/chirp/add">Add Chirp</Link>
                </div>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/chirp/:id/admin" component={EditChirp} />
                    <Route path="/chirp/add" component={AddChirp} />
                </Switch>
            </React.Fragment>
        </Router>
    )
}

interface IAppProps {

}

export default App
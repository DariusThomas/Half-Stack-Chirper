import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import './scss/app';
import Home from './ChirpRoutes/home';
import EditChirp from './ChirpRoutes/adminPage';
import AddChirp from './ChirpRoutes/addNewChirp';
import Mentions from './ChirpRoutes/mentionsPage';

const App: React.SFC<IAppProps> = () => {

    return (
        <Router>
            <React.Fragment>
                <div className="d-flex justify-content-end m-3">
                    <Link className="btn btn-primary mx-1" to="/">Home</Link>
                    <Link className="btn btn-primary mx-1" to="/chirp/add">Add Chirp</Link>
                </div>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/chirp/:id/admin" component={EditChirp} />
                    <Route exact path="/chirp/add" component={AddChirp} />
                    <Route exact path="/chirp/mentions/:name" component={Mentions} />
                </Switch>
            </React.Fragment>
        </Router>
    )
}

interface IAppProps {

}

export default App
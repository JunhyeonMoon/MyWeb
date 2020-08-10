import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './home.js';
import CanvasTutorial from './canvastutorial.js';
import About from './about.js';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/CanvasTutorial">CanvasTutorial</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        
                    </ul>

                    <hr />

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/CanvasTutorial">
                            <CanvasTutorial />
                        </Route>
                        <Route path="/About">
                            <About />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
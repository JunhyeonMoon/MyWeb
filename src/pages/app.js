import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './home.js';
import NewTab from './newtab.js';
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
                            <Link to="/NewTab" name='abc'>NewTab</Link>
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
                        <Route path="/NewTab">
                            <NewTab>{this.props.name} </NewTab>
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
import React from 'react';
import state from '../data/state.js';
import action from '../data/action.js';
import log from './module/log.js';


class App extends React.Component {
    constructor() {
        super();

        this.state = state;
        this.action = action;
        this.action.config({ context: this });
    }

    render() {
        return (
            <div id="app">
                <log />
            </div>
        );
    }
}

export default App;
